import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getAllRecipes } from '../Homepage/recipeData';
import './SearchResults.scss';
import closeIcon from '../../assets/img/icons/x.svg';

const RECIPES_PER_PAGE = 12;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);
  const allRecipes = getAllRecipes();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchTerm(q);
  }, [location.search]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults(allRecipes);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allRecipes.filter(recipe => {
        const inTitle = recipe.title.toLowerCase().includes(term);
        const inTags = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(term));
        return inTitle || inTags;
    });
    setResults(filtered);
    setVisibleCount(RECIPES_PER_PAGE); // Reset visible count on new search
  }, [searchTerm, allRecipes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
      setSearchTerm('');
      navigate('/search');
  };

  const visibleResults = results.slice(0, visibleCount);
  const canLoadMore = visibleCount < results.length;

  return (
    <div className="search-results-page">
      <div className="container">
        <h1 className="page-title">Search results</h1>
        
        <div className="search-bar-container">
            <div className="input-wrapper">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    placeholder="Search..."
                />
                {searchTerm && (
                    <button className="clear-btn" onClick={clearSearch}>
                        <img src={closeIcon} alt="Clear" />
                    </button>
                )}
            </div>
            <span className="results-count">({results.length} Recipes)</span>
        </div>

        <div className="results-grid">
            {visibleResults.map(recipe => (
                <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="recipe-card">
                    <div className="recipe-image">
                        <img src={recipe.images.cover} alt={recipe.title} />
                    </div>
                    <h3 className="recipe-title">{recipe.title}</h3>
                </Link>
            ))}
        </div>

        {results.length === 0 && (
            <div className="no-results-message">
                No recipes found for "{searchTerm}"
            </div>
        )}

        {canLoadMore && (
            <div className="load-more-container">
                <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + RECIPES_PER_PAGE)}>
                    Load More
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
