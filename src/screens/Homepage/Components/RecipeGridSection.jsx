import React from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.module.scss';
import './RecipeGridSection.scss';
import starFill from '../../../assets/img/icons/star-fill.svg';
import starEmpty from '../../../assets/img/icons/star.svg';

const RecipeGridSection = ({ title, recipes }) => {
  if (!recipes || !recipes.length) return null;

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