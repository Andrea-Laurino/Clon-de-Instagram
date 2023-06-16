import React, { useState, useRef, useEffect } from "react";
import "./uploader.css";
import { Button, Fab, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { db, storage } from "../../Firebase/firebase";
//import { auth } from '../../Firebase/auth-config';
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Uploader = () => {
  const [caption, setCaption] = useState("");
  // const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const myRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setLogged(true);
        setUser(authUser);
        
      } else {
        setLogged(false);
        setUser("");
      }
    });
    return () => {
      unsubscribe();
      user;
    };
  }, []);
  //verifica autenticacion

  const handleUpload = () => {
    myRef.current.click();
  }; //funcion que activa el diálogo de selección de archivos

  const cleanUpload = () => {
    setImageName("");
  }; //funcion que elimina el archivo elegido

  const uploadPost = async (e) => {
    try {
      const storageRef = ref(storage, `images/${imageName}`);      
      const uploadTask = uploadBytes(storageRef, image);

      // uploadTask.on("state_changed", (snapshot) => {
      //   const progress = Math.round(
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //   );
      //   setProgress(progress);
      // });

      await uploadTask;

      const url = await getDownloadURL(storageRef);
      

      let document = await addDoc(collection(db, "posts"), {
        timestamp: serverTimestamp(),
        caption: caption,
        imageSrc: url,
        username: user.displayName,
      });

      setCaption("");
      // setProgress(0);
      setImage(null);
      setImageName("");
    } catch (error) {
      console.error("Error al subir la publicación:", error);
    }
  };

  // const onUploadProgress = (uploadTask, progressCallback) => {
  //   uploadTask.on('state_changed', progressCallback);
  // };

  const changeImage = (e) => {
    const files = e.target.files;
    if (files[0]) {
      setImage(files[0]);
      setImageName(files[0].name);
    }
    e.target.value = "";
  };

  //console.log(user.displayName)

  return (
    <div className="uploader">
      <div className="uploader-data">
        <div className="uploader-image-uploader">
          {imageName ? (
            <Fab
              disabled={!logged}
              className="uploader-image-button"
              variant="extended"
              color="secondary"
              onClick={cleanUpload}
            >
              <CloseIcon className="uploader-icon" /> Clear
            </Fab>
          ) : (
            <Fab
              disabled={!logged}
              className="uploader-image-button"
              variant="extended"
              color="primary"
              onClick={handleUpload}
            >
              <CloudUploadIcon className="uploader-icon" />
              Image
            </Fab>
          )}
          <TextField
            value={imageName}
            fullWidth
            id="image-name"
            label={logged ? "image" : "Inicia sesión para hacer un posteo"}
            disabled
          />
          <input
            type="file"
            id="file"
            ref={ myRef }
            style={{ display: "none" }}
            onChange={ changeImage }
            disabled={!logged || Boolean(imageName)}
          />
        </div>

        {imageName && (
          <div className="uploader-input-container">
            <TextField
              value={caption}
              fullWidth
              multiline
              rows={3}
              id="caption"
              label="Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        )}

        {imageName && (
          <Button
            disabled={!logged || !caption}
            variant="contained"
            onClick={uploadPost}
          >
            Post
          </Button>
        )}

        {/* {progress > 0 && (
          <LinearProgress
            variant="determinate"
            value={progress}
            className="uploader-progress"
          />
        )} */}
      </div>
    </div>
  );
};

export default Uploader;
