import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Slider from 'react-slick';
import './MovieSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BiChevronDown } from 'react-icons/bi';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const MovieSlider = props => {
  const { data,detail_url } = props;
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const handleMovieHover = movie => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  return (
    <ul className="slider_list">
      <Slider {...settings}>
        {data.map(movie => {
          if (!movie.backdrop_path) {
            return null; // Skip rendering if backdrop_path is empty
          }

          const isHovered = movie === hoveredMovie;

          return (
            <li key={movie.id}>
              <Link to={`/details${detail_url}-${movie.id}`}>
                <img
                  className={`slider_image ${isHovered ? 'hovered' : ''}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  onMouseEnter={() => handleMovieHover(movie)}
                  onMouseLeave={handleMouseLeave}
                />
              </Link>
              {isHovered && (
                <div className="movie_details">
  <h3>{movie.name || movie.title}</h3>
                  <div className="icons flex j-between">
                    <div className="controls flex">
                      <IoPlayCircleSharp title="Play" />
                      <RiThumbUpFill title="Like" />
                      <RiThumbDownFill title="Dislike" />
                    </div>
                    <div className="info">
                      <BiChevronDown title="More Info" />
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </Slider>
    </ul>
  );
};

export default MovieSlider;
