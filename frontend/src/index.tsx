import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App';
import Home from './pages/Home'
import Movie from './pages/Movie';
import Search from './pages/Search';
import ImportMovies from './pages/ImportMovies';
import ImportRatings from './pages/ImportRatings';

import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './contexts/UserContext';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MovieNew from './pages/MovieNew';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='movie/:id' element={<Movie />} />
            <Route path='movie/new' element={<MovieNew />} />
            <Route path='search' element={<Search />} />
            <Route path='import/movies' element={<ImportMovies />} />
            <Route path='import/ratings' element={<ImportRatings />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='logout' element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
