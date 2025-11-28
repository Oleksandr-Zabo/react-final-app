import React from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './HeroThreeCol.scss';

const HeroThreeCol = ({ recipes }) => {
  return (
    <section className="hero-three-col hp-section">
      <div className="hp-grid-3">
        {recipes.map(recipe => (
          <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="hero-card">
            <div className="hero-card__image-wrapper">
              <img src={recipe.images.cover} alt={recipe.title} className="hero-card__image" />
            </div>
            <div className="hero-card__body">
              <div className="hero-card__rating">
                {'★'.repeat(Math.round(recipe.rating))}
                <span className="rating-inactive">{'★'.repeat(5 - Math.round(recipe.rating))}</span>
              </div>
              <h3 className="hero-card__title">{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroThreeCol;
