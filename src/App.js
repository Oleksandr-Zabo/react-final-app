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
import SearchResults from './screens/SearchResults/SearchResults';
import BlogPage from './screens/Blog/BlogPage';
import Profile from './screens/Profile/Profile';
import NotFound from './screens/NotFound/NotFound';
import CategoryDetail from './screens/Category/CategoryDetail';
import Favorites from './screens/Favorites/Favorites';
import About from './screens/About/About';
import { CookieBanner } from './components/Modal';
import { AuthModalProvider } from './context/AuthModalContext';
import GlobalAuthModal from './components/GlobalAuthModal';

function App() {
  return (
    <AuthModalProvider>
      <Router>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage-2" element={<Home2 />} />
            <Route path="/homepage-3" element={<Home3 />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/blog-post" element={<BlogPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipe/:slug" element={<RecipeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
          <CookieBanner />
          <GlobalAuthModal />
        </div>
      </Router>
    </AuthModalProvider>
  );
}

export default App;
