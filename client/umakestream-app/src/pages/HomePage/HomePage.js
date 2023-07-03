import React from 'react';
import Poster from '../../components/Poster/Poster';
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/Footer/Footer';

export default function HomePage() {
 
  return (
    <>
    <Poster />
    
    <h2>Trending Movies</h2>
    <DataFetcher url="http://localhost:5000/api/trending-movies" />
    
    <h2>Popular TV Shows</h2>
    <DataFetcher url="http://localhost:5000/api/popular-tv" />
    
    <h2>Upcoming Movies</h2>
    <DataFetcher url="http://localhost:5000/api/upcoming-movies" />
    
    <h2>Top Rated Movies</h2>
    <DataFetcher url="http://localhost:5000/api/top-rated-movies" />
    
    <h2>Top Rated TV Shows</h2>
    <DataFetcher url="http://localhost:5000/api/top-rated-tv" />
    <Footer/>
  </>
  );
}
