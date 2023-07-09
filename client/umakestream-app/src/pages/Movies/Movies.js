import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import GenreDropdown from '../../components/GenreDropdown/GenreDropdown';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    console.log(selectedGenre);
  };

  return (
    <div>
      <Header />

      <div style={{ paddingTop: '100px' }}>
      <GenreDropdown type = 'movie' onSelect={handleGenreSelect} />
        <h2>Upcoming Movies</h2>
        <DataFetcher url={`http://localhost:5000/api/upcoming-movies?genre=${selectedGenre}`} />
        <h2>popular Movies</h2>
        <DataFetcher url={`http://localhost:5000/api/popular-movies?genre=${selectedGenre}`} />
        <h2>top-rated-movies</h2>
        <DataFetcher url={`http://localhost:5000/api/top-rated-movies?genre=${selectedGenre}`} />
        <h2>now_playing </h2>
        <DataFetcher url={`http://localhost:5000/api/now_playing?genre=${selectedGenre}`} />
        <h2>trending-movies</h2>
        <DataFetcher url={`http://localhost:5000/api/trending-movies?genre=${selectedGenre}`} />
      </div>
      <Footer />
    </div>
  );
}
