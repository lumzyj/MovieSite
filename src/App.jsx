import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports

import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        {/* Hero component always displayed */}
        <Hero />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Movies />} /> {/* Updated element prop */}
          <Route path="/movies/:id" element={<MovieDetails />} /> {/* Updated element prop */}
        </Routes>

        {/* Footer component always displayed */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;


