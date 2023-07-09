import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import Movies from './pages/Movies/Movies';
import TvShows from './pages/TvShows/TvShows';
import MovieDetails from './pages/MovieDetails/MovieDetails'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/movies" element={<Movies/>} />
          <Route path='/tv-shows' element={<TvShows/>}/>
          <Route path='/profile' element = {<AccountDetails/>}/>
          <Route path='/movies/:id' element = {<MovieDetails/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
