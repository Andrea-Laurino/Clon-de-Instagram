import React from 'react';
import './header.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; //lupa
import ExploreIcon from '@mui/icons-material/Explore'; //explorar
import SlideshowIcon from '@mui/icons-material/Slideshow'; //reels
import MapsUgcIcon from '@mui/icons-material/MapsUgc'; //messenger
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; //favorite
import MenuIcon from '@mui/icons-material/Menu'; //menu hamburguesa
import AddBoxIcon from '@mui/icons-material/AddBox';
import Auth from '../Auth/auth';

import instagramLarge from '../../assets/instagram-logo-17.png';
import instagramSmall from '../../assets/instagram-logo-16.png';

const header = () => {
	return (
		<>
			<div className="container-header">
				<div className="header">
					<div className="header-logo">
						<img
							alt="logo de instagram"
							className="img-logo-lg"
							src={instagramLarge}
						/>
						<img
							alt="logo de instagram"
							className="logo-md"
							src={instagramSmall}
						/>
					</div>
					<div className="header-icons">
						<HomeIcon fontSize="large" />
						<p className="header-txt">Inicio</p>
					</div>
					<div className="header-icons">
						<SearchIcon fontSize="large" />
						<p className="header-txt">Buscar</p>
					</div>
					<div className="header-icons">
						<ExploreIcon fontSize="large" />
						<p className="header-txt">Explorar</p>
					</div>
					<div className="header-icons">
						<SlideshowIcon fontSize="large" />
						<p className="header-txt">Reels</p>
					</div>
					<div className="header-icons">
						<MapsUgcIcon fontSize="large" />
						<p className="header-txt">Mensajes</p>
					</div>
					<div className="header-icons">
						<FavoriteBorderIcon fontSize="large" />
						<p className="header-txt">Notificaciones</p>
					</div>
					<div className="header-icons">
						<AddBoxIcon fontSize="large" />
						<p className="header-txt">Crear</p>
					</div>
					<div className="header-icons">
						<Auth />
					</div>
					<div className="header-icons">
						<MenuIcon fontSize="large" />
						<p className="header-txt">Más</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default header;
