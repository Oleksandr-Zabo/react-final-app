import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Homepage/Home';
import Home2 from './screens/Homepage/Home2';
import Home3 from './screens/Homepage/Home3';
import RecipeDetail from './screens/Recipe/RecipeDetail';
import Categories from './screens/Categories/Categories';
import NotFound from './screens/NotFound/NotFound';
import { CookieBanner } from './components/Modal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homepage-2" element={<Home2 />} />
          <Route path="/homepage-3" element={<Home3 />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipe/:slug" element={<RecipeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
