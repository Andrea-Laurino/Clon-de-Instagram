import React, { useState, useEffect } from 'react';
import './post.css';
import { Avatar, TextField, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../Firebase/firebase';
import { collection, orderBy, onSnapshot } from 'firebase/firestore';

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (props.id) {
      const unsubscribe = async () => {
        const commentsRef = collection(db, 'posts', props.id, 'comments');
        const commentsQuery = orderBy(commentsRef, 'timestamp', 'asc');
        const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data()
            }))
          );
        });
  
        unsubscribeComments();
      };
  
      unsubscribe();
    }
  }, [props.id]);
  
  const addComment = (e) => {
    e.preventDefault();
    if (!comment) return;

    const commentsRef = collection(db, 'posts', props.id, 'comments');
    db.addDoc(commentsRef, {
      timestamp: db.serverTimestamp(),
      text: comment,
      username: user.displayName
    });

    setComment('');
    setShowCommentInput(false);
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <Avatar className='post-avatar' alt={props.username} src='/static/image/avatar/1.jpg' />
        <h3>{props.username}</h3>
      </div>
      <div>
        <img className='post-image' alt={props.caption} src={props.imageSrc} />
        {user ? (
          <div className='post-icons'>
            <div>
              {!liked ? (
                <div className='post-icon'>
                  <FavoriteBorderIcon onClick={() => setLiked(true)} />
                </div>
              ) : (
                <div className='post-icon'>
                  <FavoriteIcon color='secondary' onClick={() => setLiked(false)} />
                </div>
              )}
              <div
                className='post-icon'
                onClick={() => setShowCommentInput((prevState) => !prevState)}
              >
                <ChatBubbleOutlineOutlinedIcon />
              </div>
              <div className='post-icon'>
                <SendIcon />
              </div>
            </div>
            <div>
              {!bookmarked ? (
                <div className='post-icon'>
                  <BookmarkBorderIcon onClick={() => setBookmarked(true)} />
                </div>
              ) : (
                <div className='post-icon'>
                  <BookmarkIcon onClick={() => setBookmarked(false)} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <h5 className='post-alert'>Sign in to see actions</h5>
        )}
        <h4 className='post-description'>
          <strong>{props.username}</strong>
          {props.caption}
        </h4>
        <div className='post-comments'>
          {comments.map(({ id, comment }) => (
            <h4 key={id} className='post-comment'>
              <strong>{props.username}</strong>
              {comment.text}
            </h4>
          ))}
        </div>
        {showCommentInput && (
          <form className='post-comment-form'>
            <TextField
              id='comment'
              label='Comment'
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type='submit'
              disabled={!comment}
              onClick={addComment}
              className='post-comment-button'
              variant='outlined'
              endIcon={<PostAddIcon />}
            >
              Post
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Post;
