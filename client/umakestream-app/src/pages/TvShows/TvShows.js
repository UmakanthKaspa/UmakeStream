import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import GenreDropdown from '../../components/GenreDropdown/GenreDropdown';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function TvShows() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    console.log(selectedGenre);
  };

  return (
    <div>
      <Header />

      <div style={{ paddingTop: '100px' }}>
      <GenreDropdown type = 'tv' onSelect={handleGenreSelect} />
      <h2>airing_today-tv</h2>
        <DataFetcher url={`api/airing_today-tv?genre=${selectedGenre}`}  detail_url = "/tv"/>
        {/* <h2>on_the_air-tv</h2> */}
        {/* <DataFetcher url={`api/on_the_air-tv?genre=${selectedGenre}`} /> */}
        <h2>popular-tv</h2>
        <DataFetcher url={`api/popular-tv?genre=${selectedGenre}`}  detail_url = "/tv"/>

        <h2>top-rated-tv</h2>
        <DataFetcher url={`api/top-rated-tv?genre=${selectedGenre}`}  detail_url = "/tv"/>
        <h2>trending-tv</h2>
        <DataFetcher url={`api/trending-tv?genre=${selectedGenre}`} detail_url = "/tv"/>

      </div>
      <Footer />

    </div>
  );
}
