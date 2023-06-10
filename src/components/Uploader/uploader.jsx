import React, { Component } from 'react'
import './uploader.css'
import { Button, Fab, LinearProgress, TextField, withStyles } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { db, storage } from '../../Firebase/firebase';
import { auth } from '../../Firebase/auth-config'
 

class Uploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            caption: '',
            progress: 0,
            image: null,
            imageName: '',
            logged: false,
            user: null
        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        auth.onAuthStateChanged(
            (authUser) => {
                if (authUser) {
                    this.setState({ logged: true, user: authUser })
                }else{
                    this.setState({
                        caption: '',
                        progress: 0,
                        image: null,
                        imageName: '',
                        logged: false,
                        user: null
                    });
                }
               
            }
        );
    }

    handleUpload(){
        this.myRef.click();
    }

    async uploadPost(e) {
        try {
          const uploadTask = storage.ref(`images/${this.state.imageName}`).put(this.state.image);
          
          uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({ progress });
          });
          
          await uploadTask;
          
          const url = await storage.ref("images").child(this.state.imageName).getDownloadURL();
          console.log(url);
      
          await db.collection("posts").add({
            timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
            caption: this.state.caption,
            imageSrc: url,
            username: this.state.user.displayName,
          });
      
          this.setState({
            caption: "",
            progress: 0,
            image: null,
            imageName: "",
          });
        } catch (error) {
          console.error("Error al subir la publicación:", error);
          // Manejar el error de manera adecuada
        }
      }
      
      
    changeImage(e) {
        const files = e.target.files;
        if(files[0])
            this.setState({
                image: files[0],
                imageName: files[0].name
            });
            e.target.value = '';
    }

    cleanUpload() {
        this.setState({imageName: ''});
    }

  render() {
  
    return (
      <div className='uploader'>
        <div className='uploader-data'>

            <div className='uploader-image-uploader'>
                {this.state.imageName ?
                    <Fab 
                    disabled={!this.state.logged} className='uploader-image-button' variant='extended'
                    color='secondary'
                    onClick={(e) => this.cleanUpload(e)}>
                        <CloseIcon className='uploader-icon'
                        />
                        Clear</Fab>
                :
                    <Fab 
                    disabled={!this.state.logged} className='uploader-image-button' variant='extended'
                    color='primary'
                    onClick={(e) => this.handleUpload(e)}>
                        <CloudUploadIcon className='uploader-icon'
                        />
                        Image</Fab>
                }
                    
                <TextField 
                    value={this.state.imageName} fullWidth 
                    id='image-name' 
                    label={this.state.logged ? 'image' : 'Inicia sesion para hacer un posteo'} 
                    disabled 
                />
                <input 
                type='file' 
                accept='image/*' 
                onChange={(e)=> this.changeImage(e)} 
                ref={(input) => {this.myRef = input; }} 
                className='uploader-image-field' />
            </div>

            <TextField 
            disabled={!this.state.logged} 
            fullWidth 
            id='caption' 
            label='Caption' 
            multiline rows={4} 
            variant='outlined' 
            value={this.state.caption} 
            onChange={(e) => this.setState({caption: e.target.value})} 
            />

            <div className='uploader-actions'>
                {
                    this.state.progress ?

                    <div className='uploader-progress'>
                            <LinearProgress variant='determinate' value={this.state.progress} />
                    </div>
                    :
                    <Button 
                        onChange={(e) => this.uploadPost(e)} 
                        disabled={!this.state.image || !this.state.caption || !this.state.logged} 
                        variant='contained'> 
                    Upload Post</Button>
                }
            </div>
        </div>
      </div>
    )
  }
}

export default Uploader; 
// export default withStyles(useStyles)(Uploader); 