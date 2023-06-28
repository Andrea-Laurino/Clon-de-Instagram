import { useState, useEffect } from 'react';
import './post.css';
import { Avatar, TextField, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../Firebase/firebase';
import {
	collection,
	orderBy,
	onSnapshot,
	serverTimestamp,
	addDoc,
	query,
} from 'firebase/firestore';

const Post = (props) => {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);
	const [showCommentInput, setShowCommentInput] = useState(false);
	const [comment, setComment] = useState('');
	const [user, setUser] = useState('');
	const [comments, setComments] = useState([]);

	// console.log(props)

	useEffect(() => {
		const auth = getAuth();
		const user = auth.currentUser;
		//console.log(user.displayName) //devuelve el nombre del usuario logueado

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user || '');
		});
		return () => {
			unsubscribe();
			user;
		};
	}, []);

	useEffect(() => {
		if (props.id) {
			const commentsRef = collection(db, 'posts', props.id, 'comments');
			const commentsQuery = query(commentsRef, orderBy('timestamp', 'asc'));

			const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
				setComments(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						comment: doc.data(),
					}))
				);
			});

			return () => {
				unsubscribeComments();
			};
		}
	}, [props.id]);

	const addComment = async (e) => {
		e.preventDefault();
		if (!comment) return;

		try {
			await addDoc(collection(db, 'posts', props.id, 'comments'), {
				timestamp: serverTimestamp(),
				text: comment,
				username: user.displayName,
			});

			setComment('');
			setShowCommentInput(false);
		} catch (error) {
			console.error('Error al agregar el comentario:', error);
		}
	};

	const handleLikeClick = () => {
		setLiked((prevState) => !prevState);
	};

	const handleCommentIconClick = () => {
		setShowCommentInput((prevState) => !prevState);
	};

	const handleBookmarkClick = () => {
		setBookmarked((prevState) => !prevState);
	};

	return (
		<div className="post">
			<div className="post-header">
				<Avatar className="post-avatar" alt={props.username} src="" />
				<h3>{props.username}</h3>
			</div>
			<div>
				<img className="post-image" alt={props.caption} src={props.imageSrc} />
				{user ? (
					<div className="post-icons">
						<div>
							{!liked ? (
								<div className="post-icon">
									<FavoriteBorderIcon onClick={handleLikeClick} />
								</div>
							) : (
								<div className="post-icon">
									<FavoriteIcon color="error" onClick={handleLikeClick} />
								</div>
							)}
							<div className="post-icon" onClick={handleCommentIconClick}>
								<ChatBubbleOutlineOutlinedIcon />
							</div>
							<div className="post-icon">
								<SendIcon />
							</div>
						</div>
						<div>
							{!bookmarked ? (
								<div className="post-icon" onClick={handleBookmarkClick}>
									<BookmarkBorderIcon />
								</div>
							) : (
								<div className="post-icon" onClick={handleBookmarkClick}>
									<BookmarkIcon />
								</div>
							)}
						</div>
					</div>
				) : (
					<h5 className="post-alert">Inicia sesión para ver las acciones</h5>
				)}
				<h4 className="post-description">
					<strong>{props.username}</strong>: {'  '}
					{props.caption}
				</h4>
			</div>
			<div className="post-comments">
				{comments.map(({ id, comment }) => (
					<h4 key={id} className="post-comment">
						<strong>{comment.username}</strong>: {'  '}
						{comment.text}
					</h4>
				))}
			</div>
			{showCommentInput && user ? (
				<form className="post-comment-form">
					<TextField
						id="comment"
						label="Comment"
						fullWidth
						multiline
						variant="standard"
						placeholder="Agrega un comentario..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						inputProps={{ style: { color: '#333333' } }}
					/>
					<Button
						className="post-comment-button"
						type="submit"
						disabled={!comment}
						onClick={addComment}
						variant="outlined"
						color="inherit"
						endIcon={<PostAddIcon />}
					>
						Publicar
					</Button>
				</form>
			) : null}
		</div>
	);
};

export default Post;
