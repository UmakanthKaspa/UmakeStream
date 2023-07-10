import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './GenreDropdown.css';

const GenreDropdown = ({ onSelect,type }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const jwtToken = Cookies.get('jwt_token');
        const response = await fetch(`api/genere?type=${type}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await response.json();
        setGenres(data.message);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onSelect(genreId);
  };

  return (
    <select className="genre-dropdown" value={selectedGenre} onChange={handleGenreChange}>
      <option value="">Select Genre</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
