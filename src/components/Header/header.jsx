import React from 'react'
import './header.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; //lupa
import ExploreIcon from '@mui/icons-material/Explore'; //explorar
import SlideshowIcon from '@mui/icons-material/Slideshow'; //reels
import MapsUgcIcon from '@mui/icons-material/MapsUgc'; //messenger
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; //favorite
import AddBoxIcon from '@mui/icons-material/AddBox';
// import Auth from './Auth'

const header = () => {
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <img alt="logo de instagram" className='img-logo' src="src/assets/instagram-logo-17.png"/>
        </div>
        <div className="header-icons">
            <HomeIcon fontSize='large'/>
            <p className="header-txt">Inicio</p>
        </div>
          <div className="header-icons">
            <SearchIcon fontSize='large'/>
            <p className="header-txt">Buscar</p>
          </div>
          <div className="header-icons">
            <ExploreIcon fontSize='large'/>
            <p className="header-txt">Explorar</p>
          </div>
          <div className="header-icons">
            <SlideshowIcon fontSize='large'/>
            <p className="header-txt">Reels</p>
          </div>
          <div className="header-icons">
            <MapsUgcIcon fontSize='large'/>
            <p className="header-txt">Mensajes</p>
          </div>
          <div className="header-icons">
            <FavoriteBorderIcon fontSize='large'/>
            <p className="header-txt">Notificaciones</p>
          </div>
          <div className="header-icons">
            <AddBoxIcon fontSize='large'/>
            <p className="header-txt">Crear</p>
          </div>
      </div>

    </>
  );
}

export default header;

