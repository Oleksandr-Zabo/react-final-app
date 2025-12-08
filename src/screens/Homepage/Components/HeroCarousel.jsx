import React, { useState, useEffect, useCallback } from 'react';
import './HeroCarousel.scss';
import trendingUp from '../../../assets/img/icons/trending-up.svg';
import chevronLeft from '../../../assets/img/icons/chevron-left.svg';
import chevronRight from '../../../assets/img/icons/chevron-right.svg';

const HeroCarousel = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (!recipes || recipes.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === recipes.length - 1 ? 0 : prevIndex + 1));
  }, [recipes]);

  const prevSlide = () => {
    if (!recipes || recipes.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? recipes.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!recipes || recipes.length === 0) return null;

  const currentRecipe = recipes[currentIndex];

  return (
    <section className="hero-carousel hp-section">
      <div className="hero-carousel__slide" style={{ backgroundImage: `url(${currentRecipe.images.cover})` }}>
        <div className="hero-carousel__overlay"></div>
        <div className="hero-carousel__content">
          <div className="hero-carousel__stat">
            <img src={trendingUp} alt="Trending" />
            <span>{currentRecipe.wouldMakePercent}% would make this again</span>
          </div>
          <h1 className="hero-carousel__title">{currentRecipe.title}</h1>
          <p className="hero-carousel__desc">{currentRecipe.description}</p>
        </div>
        
        <button className="hero-carousel__arrow hero-carousel__arrow--left" onClick={prevSlide}>
            <img src={chevronLeft} alt="Previous" />
        </button>
        <button className="hero-carousel__arrow hero-carousel__arrow--right" onClick={nextSlide}>
            <img src={chevronRight} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
