import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import GenreDropdown from '../../components/GenreDropdown/GenreDropdown';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };
  console.log( <DataFetcher
    url={`api/upcoming-movies?genre=${selectedGenre}`}
    detail_url="/movie"
  />)
  return (
    <div>
      <Header />

      <div style={{ paddingTop: '100px' }}>
        <GenreDropdown type="movie" onSelect={handleGenreSelect} />

     
            <h2>Upcoming Movies</h2>
            <DataFetcher
              url={`api/upcoming-movies?genre=${selectedGenre}`}
              detail_url="/movie"
            />
   

        <h2>popular Movies</h2>
        <DataFetcher
          url={`api/popular-movies?genre=${selectedGenre}`}
          detail_url="/movie"
        />

        <h2>top-rated-movies</h2>
        <DataFetcher
          url={`api/top-rated-movies?genre=${selectedGenre}`}
          detail_url="/movie"
        />

        <h2>now_playing</h2>
        <DataFetcher
          url={`api/now_playing?genre=${selectedGenre}`}
          detail_url="/movie"
        />

        <h2>trending-movies</h2>
        <DataFetcher
          url={`api/trending-movies?genre=${selectedGenre}`}
          detail_url="/movie"
        />
      </div>
      <Footer />
    </div>
  );
}
