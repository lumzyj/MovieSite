import React, { useState, useEffect } from 'react';
import './Hero.css';
import Logo from '../assets/logo.svg';
import SearchIcon from '../assets/search.svg';
import MenuIcon from '../assets/menu.svg';
import imdbImage from '../assets/imdb.svg';
import tomatoImage from '../assets/tomato.svg';
import PlayIcon from '../assets/Play.svg';

function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    // Fetch search results from TMDB API
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1c0e6ac4d9b2df48035521ea9d796a78&query=${searchQuery}`
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Received data:', data);
      setSearchResults(data.results);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
      setLoading(false);
    });
  
  };

  useEffect(() => {
    setSearchResults([]); // Clear search results when the search query changes
  }, [searchQuery]);

  return (
    <div className="hero">
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <img src={SearchIcon} alt="Search" onClick={handleSearch} />
        </div>
        <div className="sign-in">Sign In</div>
        <div className="menu">
          <img src={MenuIcon} alt="Menu" />
        </div>
      </div>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div key={movie.id} className="search-result">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="search-result-poster"
              />
              <div className="search-result-info">
                <p className="search-result-title">{movie.title}</p>
                <p className="search-result-release-date">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-[404px] text-white text-5xl font-bold font-['DM Sans'] leading-[56px] text-left" style={{ marginTop: '10rem' }}>
        <p>John Wick 3 : Parabellum</p>
        <div className="flex items-center mt-7">
              <img src={imdbImage} alt="IMDb" className="mr-2" />
              <div className="0100 text-white text-xs font-normal font-['DM Sans'] leading-3">86.0 / 100</div>
              <img src={tomatoImage} alt="Tomato" className="ml-8" />
              <div className=" text-white text-xs font-normal font-['DM Sans'] leading-3 ml-2">97%</div>
        </div>
        <div className="w-72 text-white text-sm font-medium font-['DM Sans'] leading-none mt-7">John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</div>
      </div>
      <div className="Button w-44 h-9 px-4 py-1.5 bg-rose-700 rounded-md justify-start items-center gap-2 inline-flex mt-7">
        <img src={PlayIcon} alt="Play" className="Play w-5 h-5 relative" />
        <div className="WatchTrailer text-white text-sm font-bold font-['DM Sans'] uppercase leading-normal">Watch trailer</div>
     </div>
    </div>
  );
}

export default Hero;


