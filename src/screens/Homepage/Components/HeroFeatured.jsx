import React from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './HeroFeatured.scss';
import trendingUp from '../../../assets/img/icons/trending-up.svg';
import arrowRight from '../../../assets/img/icons/arrow-right.svg';

const HeroFeatured = ({ recipe }) => {
  if (!recipe) return null;
  return (
    <section className="hero-featured hp-section">
      <div className="hero-featured__image-wrap">
        <img src={recipe.images.cover} alt={recipe.title} className="hero-featured__image" />
      </div>
      <div className="hero-featured__content">
        <div className="hero-featured__stat">
          <img src={trendingUp} alt="Trending" />
          <span>{recipe.wouldMakePercent}% would make this again</span>
        </div>
        <h1 className="hero-featured__title">{recipe.title}</h1>
        <p className="hero-featured__desc">{recipe.description}</p>
        <Link to={`/recipe/${recipe.slug}`} className="hero-featured__cta" aria-label={`View ${recipe.title}`}>
          <img src={arrowRight} alt="Go" />
        </Link>
      </div>
    </section>
  );
};

export default HeroFeatured;