import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAbfcCffRli7Y76_V4bJXqBzn02Vj8nEso",
  authDomain: "instagramclone-f787f.firebaseapp.com",
  projectId: "instagramclone-f787f",
  storageBucket: "instagramclone-f787f.appspot.com",
  messagingSenderId: "843470960129",
  appId: "1:843470960129:web:2d5f21f920d93c4fb97200"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };








