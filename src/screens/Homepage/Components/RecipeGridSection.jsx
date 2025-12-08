import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '../../../context/AuthModalContext';
import '../../Homepage/home.scss';
import './RecipeGridSection.scss';
import starFill from '../../../assets/img/icons/star-fill.svg';
import starEmpty from '../../../assets/img/icons/star.svg';
import heartIcon from '../../../assets/img/icons/heart.svg';
import heartFillIcon from '../../../assets/img/icons/heart fill.svg';

const RecipeGridSection = ({ title, recipes }) => {
  const { openAuthModal } = useAuthModal();
  const [likedRecipes, setLikedRecipes] = useState({});

  useEffect(() => {
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      const parsedIds = JSON.parse(savedFavorites);
      const initialLiked = {};
      parsedIds.forEach(id => { initialLiked[id] = true; });
      setLikedRecipes(initialLiked);
    }
  }, []);

  if (!recipes || !recipes.length) return null;

  const toggleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      openAuthModal();
      return;
    }

    setLikedRecipes(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      
      // Update localStorage
      const currentFavorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      let newFavorites;
      if (newState[id]) {
        if (!currentFavorites.includes(id)) newFavorites = [...currentFavorites, id];
        else newFavorites = currentFavorites;
      } else {
        newFavorites = currentFavorites.filter(favId => favId !== id);
      }
      localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
      
      return newState;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i} 
          src={i <= Math.round(rating) ? starFill : starEmpty} 
          alt={i <= Math.round(rating) ? "filled star" : "empty star"} 
          className="star-icon"
        />
      );
    }
    return stars;
  };

  return (
    <section className="hp-section recipe-grid-section">
      <h2 className="hp-title">{title}</h2>
      <div className="hp-grid-3">
        {recipes.map(r => (
          <Link to={`/recipe/${r.slug}`} key={r.id} className="recipe-card">
            <div className="recipe-card__image-wrap">
              <img src={r.images.cover} alt={r.title} className="recipe-card__image" />
              <button 
                className={`card-like-btn ${likedRecipes[r.id] ? 'liked' : ''}`}
                onClick={(e) => toggleLike(e, r.id)}
              >
                <img src={likedRecipes[r.id] ? heartFillIcon : heartIcon} alt="Like" />
              </button>
            </div>
            <div className="recipe-card__body">
              <div className="recipe-card__rating">
                {renderStars(r.rating)}
              </div>
              <p className="recipe-card__title">{r.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecipeGridSection;