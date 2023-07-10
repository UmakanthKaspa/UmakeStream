import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FaPlay } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';
import './MovieDetails.css';
import { FaStar } from 'react-icons/fa';

const MovieDetails = () => {
  const [details, setDetails] = useState({details:[],similarResults:[]});
  console.log(details.similarResults)
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jwtToken = Cookies.get('jwt_token');
        const response = await fetch(`/api/moviedetails?id=${id}`, {
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
    adult,original_name,
    backdrop_path,
    overview,
    release_date,
    runtime,
    vote_average,
    genres,
    spoken_languages,
    vote_count,
    revenue,
    first_air_date,
    episode_run_time,
    number_of_seasons,
    number_of_episodes,
    networks,
  } = details.details;

  const isMovie = !!release_date;
  const isTVShow = !!first_air_date;

  return (
    <div>
      <div
        className="Home_poster"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`,
        }}
      >
        <Header />
        <div className="vertical">
          <div className="horizontal">
            <div className="Home_poster_title">{title||original_name }</div>
            <div className="Movie_details">
            <div>
  {isMovie
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : episode_run_time && episode_run_time.length > 0
    ? `${episode_run_time} mins per episode`
    : 'Unknown'}
</div>



              <div className="UA">{isMovie ? (adult ? 'A' : 'U/A') : 'TV'}</div>
              <div>{isMovie ? release_date : first_air_date}</div>
            </div>
            <div className="Home_poster_overview">{overview}</div>
            <div className="buttons_card">
              <button type="button" className="watch_button">
                <FaPlay size={13} /> PLAY
              </button>
              <button type="button" className="infoButton">
                + MY LIST
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>more info</h1>
      <div className="movie_details_middle_card">
        <ul>
          <h1 className="movie_details_middle_card_heading">Genres</h1>
          {genres &&
            genres.map((genre) => (
              <p className="movie_details_middle_card_values" key={genre.id}>
                {genre.name}
              </p>
            ))}
        </ul>

        <ul>
          <h1 className="movie_details_middle_card_heading">
            Audio Available
          </h1>
          {spoken_languages &&
            spoken_languages.map((language) => (
              <p
                className="movie_details_middle_card_values"
                key={language.iso_639_1}
              >
                {language.english_name}
              </p>
            ))}
        </ul>
        <ul>
          <h1 className="movie_details_middle_card_heading">Rating Count</h1>
          <p className="movie_details_middle_card_values">{vote_count}</p>
          <h1 className="movie_details_middle_card_heading">
            Rating Average
          </h1>
          <p className="movie_details_middle_card_values">{vote_average}</p>
        </ul>
        {isMovie && (
          <ul>
            <h1 className="movie_details_middle_card_heading">Budget</h1>
            <p className="movie_details_middle_card_values">{revenue}</p>
            <h1 className="movie_details_middle_card_heading">release_date</h1>
            <p className="movie_details_middle_card_values">{release_date}</p>
          </ul>
          
        )}
        {isTVShow && (
          <ul>
            <h1 className="movie_details_middle_card_heading">
              Number of Seasons
            </h1>
            <p className="movie_details_middle_card_values">
              {number_of_seasons}
            </p>
            <h1 className="movie_details_middle_card_heading">
              Number of Episodes
            </h1>
            <p className="movie_details_middle_card_values">
              {number_of_episodes}
            </p>
          </ul>
        )}
      </div>
      <h1 className="MoreLikeThis">More like this</h1>
      <ul className="similar_movies_list">
  {details.similarResults.map(a => (
    <li key={a.id}>
      {a.backdrop_path && (
        <div>
          <img className="details_image" src={`https://image.tmdb.org/t/p/w500/${a.backdrop_path}`} alt={a.title} />
          <div className="details_tooltip">
            <h4>{a.title||a.name}</h4>
            <p>{a.vote_average}               <FaStar className="star_icon" /></p>
          </div>
        </div>
      )}
    </li>
  ))}
</ul>
    </div>
  );
};

export default MovieDetails;
