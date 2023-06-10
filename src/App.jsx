import { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/Header/header";
import Post from "./components/Post/post";
import { db } from './Firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import HistoryPanel from './components/HistoryPanel/historyPanel';
import Uploader from './components/Uploader/uploader';

async function fetchPosts() {
  try {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    }));
    
    return posts;
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los posts:', error);
    return [];
  }
}

function App() { 
  const [posts, setPosts] = useState([]);

  const unsubscribe = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  }

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <div className="app">
      <Header />
      <HistoryPanel />
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          id={id}
          imageSrc={post.imageSrc}
          username={post.username}
          caption={post.caption}
        />
      ))}

      <Uploader />
    </div>
  );
}

export default App;
