import React, { useEffect, useState } from 'react';
import FavoritePopup from './FavoritePopup';
import { Link } from 'react-router-dom';
import imdbImage from '../assets/imdb.svg';
import tomatoImage from '../assets/tomato.svg';
import favoriteImage from '../assets/Favorite.svg';
import SeeMore from '../assets/Chevron right.svg';
import './Movies.css';

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=1c0e6ac4d9b2df48035521ea9d796a78')
      .then((res) => res.json())
      .then((json) => setMovieList(json.results.slice(0, 10)));
  };

  const getGenres = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1c0e6ac4d9b2df48035521ea9d796a78')
      .then((res) => res.json())
      .then((json) => setGenres(json.genres));
  };

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  const getYearFromDate = (date) => {
    return date.slice(0, 4);
  };

  const getCountryFromLanguage = (originalLanguage) => {
    const languageToCountry = {
      en: 'USA', // English
      es: 'Spain', // Spanish
      fr: 'France', // French
      de: 'Germany', // German
      it: 'Italy', // Italian
      // Add more language-country mappings as needed
    };
    return languageToCountry[originalLanguage] || 'Korea';
  };

  const getTomatoRating = (voteAverage, voteCount) => {
    const tomatoRating = (voteAverage / 10) * 100;
    return tomatoRating.toFixed(0);
  };

  const getGenreNames = (genreIds) => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : '';
    });
    return genreNames.join(', ');
  };

  const showFavoritePopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closeFavoritePopup = () => {
    setShowPopup(false);
  };

  const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      // Movie is already in favorites, remove it
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      setFavorites(updatedFavorites);
      showFavoritePopup('Removed from favorites');
    } else {
      // Movie is not in favorites, add it
      const updatedFavorites = [...favorites, movieId];
      setFavorites(updatedFavorites);
      showFavoritePopup('Added to favorites');
    }
  };

  return (
    <div className="px-12">
      <div className="flex justify-between items-center mb-8 mt-20 px-9">
        <h2 className="text-black font-'DM Sans' text-3xl font-bold">
          Featured Movie
        </h2>
        <a
          href="#"
          className="text-rose-700 font-'DM Sans' text-lg font-normal flex items-center"
        >
          See More
          <img src={SeeMore} alt="Arrow" className="ml-2" />
        </a>
      </div>
      <div className="px-4 flex flex-wrap">
        {movieList.map((movie) => (
          <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-5 relative " data-testid="movie-card">
            {/* Favorite icon */}
            <img
              src={favoriteImage}
              alt="Favorite"
              className={`absolute top-6 right-6 cursor-pointer ${
                favorites.includes(movie.id) ? 'favorite-active' : ''
              }`}
              onClick={() => toggleFavorite(movie.id)}
              data-testid="movie-favorite"
            />
            {/* Movie poster */}
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                data-testid="movie-poster"
              />
            </Link>
            {/* Display the release date and country */}
            <p className="text-gray-600 mt-2" data-testid="movie-release-date">
              {getCountryFromLanguage(movie.original_language)},{' '}
              {new Date(movie.release_date).toUTCString()}
            </p>
            <h2 className="text-lg font-semibold mt-2" data-testid="movie-title">
              {movie.title}
            </h2>
            {/* Display the IMDb image and rating as a percentage */}
            <div className="flex items-center">
              <img src={imdbImage} alt="IMDb" className="mr-2" />
              <p className="text-gray-600" data-testid="movie-imdb-rating">
                {movie.vote_average * 10}/100
              </p>
              <img src={tomatoImage} alt="Tomato" className="ml-auto" />
              <p className="text-gray-600 ml-2" data-testid="movie-tomato-rating">
                {getTomatoRating(movie.vote_average, movie.vote_count)}%
              </p>
            </div>
            {/* Display the genres using genre names */}
            <p className="text-gray-600 mt-2" data-testid="movie-genres">
              {getGenreNames(movie.genre_ids)}
            </p>
          </div>
        ))}
      </div>
      {showPopup && <FavoritePopup message={popupMessage} onClose={closeFavoritePopup} />}
    </div>
  );
}

export default Movies;












