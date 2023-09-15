import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies/:id"
            element={<MovieDetails />}
          />
          <Route
            path="/coming-soon"
            element={<ComingSoon />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





