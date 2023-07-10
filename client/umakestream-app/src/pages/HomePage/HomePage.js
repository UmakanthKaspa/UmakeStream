import React, { useEffect } from 'react';
import Poster from '../../components/Poster/Poster';
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/Footer/Footer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('jwt_token')) {
      navigate('/login');
    }
  });

  return (
    <>
      <Poster />

      <h2 className="heading">Trending Movies</h2>
        <DataFetcher url="api/trending-movies" detail_url = "/movie"/>

      <h2 className="heading">Popular TV Shows</h2>
        <DataFetcher url="api/popular-tv"  detail_url = "/tv"/>

      <h2 className="heading">Upcoming Movies </h2>
        <DataFetcher url="api/upcoming-movies"  detail_url = "/movie" />

      <h2 className="heading">Top Rated Movies</h2>
        <DataFetcher url="api/top-rated-movies"  detail_url = "/movie" />

      <h2 className="heading">Top Rated TV Shows</h2>
        <DataFetcher url="api/top-rated-tv"  detail_url = "/tv"/>
      <Footer />
    </>
  );
}
