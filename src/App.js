import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Homepage/Home';
import RecipeDetail from './screens/Recipe/RecipeDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:slug" element={<RecipeDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
