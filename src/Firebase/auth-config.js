
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbfcCffRli7Y76_V4bJXqBzn02Vj8nEso",
    authDomain: "instagramclone-f787f.firebaseapp.com",
    projectId: "instagramclone-f787f",
    storageBucket: "instagramclone-f787f.appspot.com",
    messagingSenderId: "843470960129",
    appId: "1:843470960129:web:2d5f21f920d93c4fb97200"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;