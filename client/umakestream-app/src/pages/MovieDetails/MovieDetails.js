import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './MovieDetails.css'

const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jwtToken = Cookies.get('jwt_token');
        const response = await fetch(`http://localhost:5000/api/moviedetails?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await response.json();
        setDetails(data.message);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const {
    title,
    overview,
    release_date,
    runtime,
    vote_average,
    poster_path,
    genres,
    production_companies,
  } = details;

  return (
    <div className="movie-details">
      <div className="poster-container">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} className="poster" />
      </div>
      <div className="details-container">
        <h2 className="title">{title}</h2>
        <p className="overview">{overview}</p>
        <div className="additional-info">
          <p className="release-date">Release Date: {release_date}</p>
          <p className="runtime">Runtime: {runtime} minutes</p>
          <p className="average-rating">Average Rating: {vote_average}</p>
        </div>
        <div className="genres">
          <p>Genres:</p>
          <ul>
            {genres &&
              genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
          </ul>
        </div>
        <div className="production-companies">
          <p>Production Companies:</p>
          <ul>
            {production_companies &&
              production_companies.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
