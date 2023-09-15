import React from 'react';
import './Sidebar.css';
import LogoSvg from '../assets/Logo1.png';
import HomeImg from '../assets/Home.svg';
import CalendarImg from '../assets/Calendar.svg';
import LogoutImg from '../assets/Logout.svg';
import MovieProjectorImg from '../assets/Movie Projector.svg';
import TvShowImg from '../assets/TV Show.svg';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <img src={LogoSvg} alt="Logo" className="sidebar-logo" />
      <div className="sidebar-items">
        <Link
          to="/"
          className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <img src={HomeImg} alt="Home" className="sidebar-icon" />
          <span className="sidebar-text">Home</span>
        </Link>

        <Link
          to="/movies"
          className={`sidebar-item ${location.pathname === '/movies' ? 'active' : ''}`}
        >
          <img src={MovieProjectorImg} alt="Movie Projector" className="sidebar-icon" />
          <span className="sidebar-text">Movies</span>
        </Link>

        <Link
          to="/coming-soon"
          className={`sidebar-item ${location.pathname === '/coming-soon' ? 'active' : ''}`}
        >
          <img src={TvShowImg} alt="TV Show" className="sidebar-icon" />
          <span className="sidebar-text">TV Series</span>
        </Link>

        <Link to="/" className="sidebar-item">
          <img src={CalendarImg} alt="Calendar" className="sidebar-icon" />
          <span className="sidebar-text">Upcoming</span>
        </Link>
        <div className='side-note-text'>
          <span className='quizes'>
            Play movie quizzes and earn free tickets
          </span>
          <p className='peeps'>50k people are playing now</p>
          <button className='start'>Start playing</button>
        </div>
        <div className="sidebar-item mt-9">
          <img src={LogoutImg} alt="Logout" className="sidebar-icon" />
          <span className="sidebar-text">Logout</span>
        </div>
       
      </div>
    </div>
  );
};

export default Sidebar;


