import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../Homepage/recipeData';
import './Favorites.scss';
import heartIcon from '../../assets/img/icons/heart fill.svg'; // Orange heart for title
import trashIcon from '../../assets/img/icons/trash.svg'; // Need to check if exists or use generic
import editIcon from '../../assets/img/icons/edit.svg'; // Need to check
import checkCircleIcon from '../../assets/img/icons/check-circle.svg'; // Need to check

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    // For demo purposes, let's load all recipes as "favorites" to match the screenshot's populated look
    // In a real app, we would read from localStorage or API
    const allRecipes = getAllRecipes().map((r, index) => ({ ...r, originalIndex: index }));
    setFavorites(allRecipes);
  }, []);

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === favorites.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(favorites.map(r => r.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    
    if (window.confirm(`Remove ${selectedIds.length} recipes from favorites?`)) {
      setFavorites(favorites.filter(r => !selectedIds.includes(r.id)));
      setSelectedIds([]);
      setIsSelectionMode(false);
    }
  };

  const getSortedFavorites = () => {
    const sorted = [...favorites];
    if (sortOption === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default to 'newest' (original order)
      sorted.sort((a, b) => a.originalIndex - b.originalIndex);
    }
    return sorted;
  };

  const visibleRecipes = getSortedFavorites().slice(0, visibleCount);

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <div className="title-section">
            <div className="icon-wrapper">
               {/* Using a div with background or img for the orange heart circle */}
               <img src={heartIcon} alt="Favorites" />
            </div>
            <h1>Favorites</h1>
          </div>
          
          <div className="sort-wrapper">
             <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="newest">Sort: Newest</option>
                <option value="name">Sort: A-Z</option>
             </select>
          </div>
        </div>

        <div className="favorites-toolbar">
            <span className="recipe-count">({favorites.length} Recipes)</span>
            
            <div className="toolbar-actions">
                <button className={`action-btn ${isSelectionMode ? 'active' : ''}`} onClick={toggleSelectionMode}>
                    <span className="icon">✎</span> Select
                </button>
                
                {isSelectionMode && (
                    <>
                        <button className="action-btn" onClick={toggleSelectAll}>
                            <span className="icon">○</span> All
                        </button>
                        <button className="action-btn delete-btn" onClick={handleDelete} disabled={selectedIds.length === 0}>
                            <span className="icon">🗑</span> Delete
                        </button>
                    </>
                )}
            </div>
        </div>

        <div className="favorites-grid">
            {visibleRecipes.map(recipe => (
                <div key={recipe.id} className={`favorite-card-wrapper ${isSelectionMode ? 'selection-mode' : ''}`}>
                    <Link to={`/recipe/${recipe.slug}`} className="favorite-card" onClick={(e) => isSelectionMode && e.preventDefault()}>
                        <div className="image-wrapper" onClick={() => isSelectionMode && toggleSelect(recipe.id)}>
                            <img src={recipe.images.cover} alt={recipe.title} />
                            {isSelectionMode && (
                                <div className={`selection-overlay ${selectedIds.includes(recipe.id) ? 'selected' : ''}`}>
                                    <div className="checkbox" />
                                </div>
                            )}
                        </div>
                        <h3 className="recipe-title">{recipe.title}</h3>
                    </Link>
                </div>
            ))}
        </div>

        {visibleCount < favorites.length && (
            <div className="load-more-container">
                <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 12)}>
                    Load More
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
