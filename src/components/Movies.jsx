import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imdbImage from '../assets/imdb.svg';
import tomatoImage from '../assets/tomato.svg';
import favoriteImage from '../assets/Favorite.svg';

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1c0e6ac4d9b2df48035521ea9d796a78')
      .then((res) => res.json())
      .then((json) => setMovieList(json.results.slice(0, 13)));
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
    return languageToCountry[originalLanguage] || 'Country not available';
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

  const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      // Movie is already in favorites, remove it
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      setFavorites(updatedFavorites);
      console.log(`Removed movie with ID ${movieId} from favorites`);
    } else {
      // Movie is not in favorites, add it
      const updatedFavorites = [...favorites, movieId];
      setFavorites(updatedFavorites);
      console.log(`Added movie with ID ${movieId} to favorites`);
    }
  };
  

  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-between">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="w-1/4 p-5 relative"
          >
            {/* Favorite icon */}
            <img
              src={favoriteImage}
              alt="Favorite"
              className={`absolute top-6 right-6 cursor-pointer`}
              onClick={() => toggleFavorite(movie.id)}
              style={{
                marginTop: '10px',
                marginRight: '10px',
                fill: favorites.includes(movie.id) ? 'red' : 'grey',
              }}
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
            />
            </Link>
            {/* Display the release date and country */}
            <p className="text-gray-600">
              {getCountryFromLanguage(movie.original_language)}, {getYearFromDate(movie.release_date)}
            </p>
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            {/* Display the IMDb image and rating as a percentage */}
            <div className="flex items-center">
              <img src={imdbImage} alt="IMDb" className="mr-2" />
              <p className="text-gray-600">{movie.vote_average * 10}/100</p>
              <img src={tomatoImage} alt="Tomato" className="ml-auto" />
              <p className="text-gray-600 ml-2">{getTomatoRating(movie.vote_average, movie.vote_count)}%</p>
            </div>
            {/* Display the genres using genre names */}
            <p className="text-gray-600 mt-2">{getGenreNames(movie.genre_ids)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;








