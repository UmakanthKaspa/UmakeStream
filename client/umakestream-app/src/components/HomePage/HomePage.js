import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

import './HomePage.css';

const RequestStatus = {
  FAILURE: 'failure',
  SUCCESS: 'success',
  IN_PROGRESS: 'inProgress',
};

const Home = () => {
  const [poster, setPoster] = useState({});
  const [posterStatus, setPosterStatus] = useState('');

  useEffect(() => {
    fetchPoster();
  }, []); // Empty dependency array

  const fetchPoster = async () => {
    setPosterStatus(RequestStatus.IN_PROGRESS);
    try {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch('http://localhost:5000/api/now_playing', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const randomPoster =
          data.message[Math.floor(Math.random() * data.message.length)];

        const updatedPoster = {
          id: randomPoster.id,
          backdropPath: randomPoster.backdrop_path,
          title: randomPoster.title,
          overview: randomPoster.overview,
        };

        setPosterStatus(RequestStatus.SUCCESS);
        setPoster(updatedPoster);
      } else {
        console.log('Authentication failed');
        setPosterStatus(RequestStatus.FAILURE);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setPosterStatus(RequestStatus.FAILURE);
    }
  };

  const renderPoster = () => {
    const { title, backdropPath, overview } = poster;

    switch (posterStatus) {
      case RequestStatus.SUCCESS:
        return (
          <div className="home_poster">
            <div
              className="poster_image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdropPath})`,
              }}
            >
              <div className="poster_content">
                <div className="poster_title">{title}</div>
                <div className="poster_overview">{overview}</div>
                <div className="poster_button">
                  <button type="button">Play</button>
                </div>
              </div>
            </div>
          </div>
        );
      case RequestStatus.IN_PROGRESS:
        return (
          <CustomLoader height="85vh" width="100vw" />
        );
      case RequestStatus.FAILURE:
        return (
          <div>
            <p>Failure</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home_container">
      {renderPoster()}
      <div className="movie_slider">
        {/* Add your movie slider content here */}
      </div>
    </div>
  );
};

export default Home;
