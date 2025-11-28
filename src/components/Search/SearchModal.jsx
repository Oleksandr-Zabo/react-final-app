import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchModal.scss';
import { getAllRecipes } from '../../screens/Homepage/recipeData';
import closeIcon from '../../assets/img/icons/x.svg';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const allRecipes = getAllRecipes();

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

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <input 
            type="text" 
            placeholder="Search recipes, categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <div className="search-results">
            {searchTerm && results.length === 0 && (
                <div className="no-results">No results found for "{searchTerm}"</div>
            )}
            
            {results.map((result, index) => {
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
            
            {results.length > 0 && (
                <button className="see-all-btn">
                    See all {results.length} results
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
