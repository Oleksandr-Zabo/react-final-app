import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '../../../context/AuthModalContext';
import '../../Homepage/home.scss';
import './LatestRecipesGrid.scss';
import heartIcon from '../../../assets/img/icons/heart.svg';
import heartFillIcon from '../../../assets/img/icons/heart fill.svg';

const LatestRecipesGrid = ({ initialRecipes }) => {
  const { openAuthModal } = useAuthModal();
  const batch = 12;
  const [visible, setVisible] = useState(batch);
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

  const list = initialRecipes.slice(0, visible);
  const canLoadMore = visible < initialRecipes.length;

  const toggleLike = (e, id) => {
    e.preventDefault(); // Prevent navigation
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