import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchModal.scss';
import { getAllRecipes } from '../../screens/Homepage/recipeData';
import closeIcon from '../../assets/img/icons/x.svg';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const allRecipes = getAllRecipes();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus the input when the panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();

    // Find matching categories (tags)
    const categories = new Set();
    const categoryImages = {};

    allRecipes.forEach(recipe => {
      if (recipe.tags) {
        recipe.tags.forEach(tag => {
          if (tag.toLowerCase().includes(term)) {
            categories.add(tag);
            if (!categoryImages[tag] && recipe.images && recipe.images.cover) {
                categoryImages[tag] = recipe.images.cover;
            }
          }
        });
      }
    });

    // Find matching recipes
    const matchedRecipes = allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term)
    );

    // Format results
    const formattedResults = [
      ...Array.from(categories).map(cat => ({ type: 'category', name: cat, image: categoryImages[cat] })),
      ...matchedRecipes.map(recipe => ({ type: 'recipe', data: recipe }))
    ];

    setResults(formattedResults);
  }, [searchTerm, allRecipes]);

  const handleSeeAll = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
        handleSeeAll();
    }
    if (e.key === 'Escape') {
        onClose();
    }
  };

  // if (!isOpen) return null; // Removed to keep it in DOM

  return (
    <div 
      className={`search-panel ${isOpen ? 'open' : ''}`} 
      onClick={e => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Search recipes"
    >
      <div className="search-header">
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search recipes, categories..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search input"
        />
        <button className="close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
      
      <div className="search-results">
            {searchTerm && results.length === 0 && (
                <div className="no-results">No results found for "{searchTerm}"</div>
            )}
            
            {results.slice(0, 6).map((result, index) => {
                if (result.type === 'category') {
                    return (
                        <div key={`cat-${index}`} className="search-result-item category">
                            <div className={`result-image ${result.image ? '' : 'category-placeholder'}`}>
                                {result.image ? (
                                    <img src={result.image} alt={result.name} style={{borderRadius: '50%'}} />
                                ) : (
                                    <span>{result.name[0].toUpperCase()}</span>
                                )}
                            </div>
                            <div className="result-info">
                                <span className="result-title">{result.name}</span>
                                <span className="result-type">Category</span>
                            </div>
                        </div>
                    );
                } else {
                    const recipe = result.data;
                    return (
                        <Link 
                            to={`/recipe/${recipe.slug}`} 
                            key={recipe.id} 
                            className="search-result-item recipe"
                            onClick={onClose}
                        >
                            <div className="result-image">
                                <img src={recipe.images.cover} alt={recipe.title} />
                            </div>
                            <div className="result-info">
                                <span className="result-title">{recipe.title}</span>
                            </div>
                        </Link>
                    );
                }
            })}
            
            {results.length > 6 && (
                <div className="see-all-container">
                    <button className="see-all-btn" onClick={handleSeeAll}>
                        See all {results.length} results
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default SearchModal;
