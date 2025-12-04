import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './RecipeGridSection.scss';
import starFill from '../../../assets/img/icons/star-fill.svg';
import starEmpty from '../../../assets/img/icons/star.svg';
import heartIcon from '../../../assets/img/icons/heart.svg';
import heartFillIcon from '../../../assets/img/icons/heart fill.svg';

const RecipeGridSection = ({ title, recipes }) => {
  const [likedRecipes, setLikedRecipes] = useState({});

  if (!recipes || !recipes.length) return null;

  const toggleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedRecipes(prev => ({
        ...prev,
        [id]: !prev[id]
    }));
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