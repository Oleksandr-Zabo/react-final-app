import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './LatestRecipesGrid.scss';
import heartIcon from '../../../assets/img/icons/heart.svg';
import heartFillIcon from '../../../assets/img/icons/heart fill.svg';

const LatestRecipesGrid = ({ initialRecipes }) => {
  const batch = 12;
  const [visible, setVisible] = useState(batch);
  const [likedRecipes, setLikedRecipes] = useState({});
  
  const list = initialRecipes.slice(0, visible);
  const canLoadMore = visible < initialRecipes.length;

  const toggleLike = (e, id) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    setLikedRecipes(prev => ({
        ...prev,
        [id]: !prev[id]
    }));
  };

  return (
    <section className="hp-section latest-recipes-grid">
      <h2 className="hp-title">Latest Recipes</h2>
      <div className="hp-grid-4 latest-recipes-grid__wrap">
        {list.map(r => (
          <Link to={`/recipe/${r.slug}`} key={r.id} className="recipe-card small">
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
              <p className="recipe-card__title">{r.title}</p>
            </div>
          </Link>
        ))}
      </div>
      {canLoadMore && (
        <div className="latest-recipes-grid__load">
          <button onClick={()=>setVisible(v=>v+batch)}>Load More</button>
        </div>
      )}
    </section>
  );
};

export default LatestRecipesGrid;