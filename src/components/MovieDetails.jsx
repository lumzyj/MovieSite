import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MovieDetails.css';
import Star from '../assets/Star.png';
import TwoTicketsImg from '../assets/Two Tickets.svg';
import ListImg from '../assets/List.svg';
import More from '../assets/More.png';

const MovieDetails = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator

  const loadVideo = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1c0e6ac4d9b2df48035521ea9d796a78&append_to_response=videos`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        if (data.videos?.results.length > 0) {
          const firstVideoKey = data.videos.results[0].key;
          setTrailerKey(firstVideoKey);
        }
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when data is loaded
      });
  }, [id]);

  return (
    <div className="movie-details-container">
      <Sidebar />
      <div className="movie-content">
        <div className="movie-trailer">
          {isLoading ? (
            <div className="loading-spinner"></div> // Loading spinner
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              allow="autoplay"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="video-placeholder" onClick={loadVideo}>
              {/* <img src={More} alt="Play Video" /> */}
            </div>
          )}
        </div>
        <div className="movie-info">
          <p className="movietitle" data-testid="movie-title">
            {movieDetails.title}
          </p>
          <p className='Release Year' data-testid="movie-release-date">
            {new Date(movieDetails.release_date).toUTCString()}
          </p>
          <p className="PG Rating">
            PG-13
          </p>
          <p className= 'Movierun' data-testid="movie-runtime">
            {`${movieDetails.runtime} minutes`}
          </p>
          <div className="genres">
            {movieDetails.genres?.map((genre) => (
              <span key={genre.id} className="genre mr-2">{genre.name}</span>
            ))}
          </div>
          <img src={Star} alt="Star Rating" className="rating mr-3" style={{ width: '24px', height: '24px' }} />
          <p className="rating-score">{`${movieDetails.vote_average} | ${movieDetails.vote_count}k`}</p>
        </div>
        <div className='movie-description'>
          <p className='description' data-testid="movie-overview">
            {movieDetails.overview}
          </p>
          <div className='button-container'>
            <button className='SeeMore'>
              <img src={TwoTicketsImg} alt="Two Tickets" className='ticket-icon' />
              See Showtimes
            </button>
            <button className='options'>
              <img src={ListImg} alt="List" className='list-icon' />
              More watch options
            </button>
            <img src={More} alt="List" className='list-icon mt-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;











