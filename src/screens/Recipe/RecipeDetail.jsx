import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeBySlug, getYouMightAlsoLike, getLatestRecipes } from '../Homepage/recipeData';
import './RecipeDetail.scss';
import starIcon from '../../assets/img/icons/star-fill.svg';
import clockIcon from '../../assets/img/icons/clock.svg';
import chartIcon from '../../assets/img/icons/bar-chart.svg';
import printerIcon from '../../assets/img/icons/printer.svg';
import shareIcon from '../../assets/img/icons/share.svg';
import bookmarkIcon from '../../assets/img/icons/bookmark.svg';
import playIcon from '../../assets/img/icons/play-circle.svg';
import heartIcon from '../../assets/img/icons/heart.svg';
import heartFillIcon from '../../assets/img/icons/heart fill.svg';
import Comments from '../../components/Comments/Comments';
import { AuthModal } from '../../components/Modal';

const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);
  const [liked, setLiked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setCurrentUser(JSON.parse(savedProfile));
      } else {
        setCurrentUser(null);
      }
    };

    loadProfile();
    window.addEventListener('userProfileUpdate', loadProfile);
    return () => window.removeEventListener('userProfileUpdate', loadProfile);
  }, []);

  useEffect(() => {
    if (recipe) {
        // Load related recipes
        if (recipe.related && recipe.related.length > 0) {
            const related = recipe.related.map(slug => getRecipeBySlug(slug)).filter(Boolean);
            setRelatedRecipes(related);
        } else {
            let suggestions = getYouMightAlsoLike();
            // Filter out current recipe
            suggestions = suggestions.filter(r => r.id !== recipe.id);
            
            // If we need more to fill 4 slots
            if (suggestions.length < 4) {
                const more = getLatestRecipes(10).filter(r => r.id !== recipe.id && !suggestions.find(s => s.id === r.id));
                suggestions = [...suggestions, ...more].slice(0, 4);
            }
            setRelatedRecipes(suggestions);
        }
        
        // Reset state on slug change
        setLiked(false);
        setCheckedIngredients({});
    }
  }, [slug, recipe]);

  const toggleIngredient = (id) => {
    setCheckedIngredients(prev => ({
        ...prev,
        [id]: !prev[id]
    }));
  };

  const toggleLike = () => {
    if (!currentUser) {
        setIsAuthModalOpen(true);
        return;
    }
    setLiked(!liked);
  };
  
  if (!recipe) {
    return (
      <main className="recipe-detail-page">
        <div className="recipe-container">
            <h1>Not Found</h1>
            <p>No recipe matches slug: {slug}</p>
            <Link to="/" className="back-link">Go Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="recipe-detail-page">
      <div className="recipe-container">
        
        <div className="recipe-header-top">
            <div className="recipe-meta-top">
                {recipe.wouldMakePercent && (
                    <span className="trend-badge">
                        <img src={chartIcon} alt="" /> {recipe.wouldMakePercent}% would make this again
                    </span>
                )}
                <div className="action-buttons">
                    <button className="icon-btn"><img src={shareIcon} alt="Share" /></button>
                    <button className="icon-btn"><img src={bookmarkIcon} alt="Save" /></button>
                </div>
            </div>
            
            <h1 className="recipe-title">{recipe.title}</h1>
            
            <div className="recipe-author-block">
                {recipe.author && (
                    <div className="author-info">
                        <img src={recipe.author.avatar} alt={recipe.author.name} className="author-avatar" />
                        <div className="author-text">
                            <span className="author-name">{recipe.author.name}</span>
                            <span className="post-date">Yesterday</span> {/* Mock date or use recipe.updatedAt */}
                        </div>
                    </div>
                )}
                <div className="recipe-rating-block">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={starIcon} alt="star" className={i < Math.floor(recipe.rating) ? 'star-filled' : 'star-empty'} />
                        ))}
                    </div>
                    <span className="review-count">{recipe.reviewsCount} reviews</span>
                </div>
            </div>

            <p className="recipe-desc">{recipe.description}</p>
        </div>

        <div className="recipe-hero-wrapper">
            <img src={recipe.images.cover} alt={recipe.title} className="recipe-hero-image" />
            <button className="play-button">
                <img src={playIcon} alt="Play Video" />
            </button>
        </div>

        <div className="recipe-info-bar">
            <div className="info-item">
                <span className="label">PREP TIME</span>
                <span className="value">{recipe.prepTime}</span>
            </div>
            <div className="info-item">
                <span className="label">COOK TIME</span>
                <span className="value">{recipe.cookTime || '15 MIN'}</span> 
            </div>
            <div className="info-item">
                <span className="label">SERVINGS</span>
                <span className="value">{recipe.servings} PEOPLE</span>
            </div>
            <button className="print-button">
                <img src={printerIcon} alt="Print" />
            </button>
        </div>

        <div className="recipe-content-grid">
            <div className="left-column">
                <div className="ingredients-section">
                    <h2>Ingredients</h2>
                    {recipe.ingredients.map((group, idx) => (
                    <div key={group.group || idx} className="ingredient-group">
                        {group.group && <h3>{group.group}</h3>}
                        <ul className="ingredient-list">
                        {group.items.map((item, i) => {
                            const itemId = item.id || `${idx}-${i}`;
                            const isChecked = checkedIngredients[itemId];
                            return (
                                <li key={itemId} className={isChecked ? 'checked' : ''} onClick={() => toggleIngredient(itemId)}>
                                    <div className={`checkbox ${isChecked ? 'active' : ''}`}>
                                        {isChecked && <span>✓</span>}
                                    </div>
                                    <span className="ingredient-text">
                                        {item.qty && `${item.qty} `}{item.unit && `${item.unit} `}{item.name}
                                    </span>
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                    ))}
                </div>

                {recipe.nutrition && (
                    <div className="nutrition-section">
                        <h2>Nutrition Facts</h2>
                        <div className="nutrition-grid">
                            {Object.entries(recipe.nutrition.perServing).map(([key, value]) => {
                                if (key === 'unit') return null;
                                return (
                                    <div key={key} className="nutrition-item">
                                        <span className="nutri-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="nutri-value">{value}{recipe.nutrition.perServing.unit}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="right-column">
                <div className="instructions-section">
                    <h2>Instructions</h2>
                    <ul className="steps-list">
                    {recipe.steps.map((s, i) => (
                        <li key={i}>
                            <div className="step-number">{i + 1}</div>
                            <div className="step-text">{s.text}</div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="already-made-section">
            <h2>Already made this?</h2>
            <button className="feedback-btn">Share your feedback</button>
            <div className="like-container">
                 {/* Added like button here as requested "add ability to put likes" */}
                 <button className={`like-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
                    <img src={liked ? heartFillIcon : heartIcon} alt="Like" />
                 </button>
            </div>
        </div>

        <div className="comments-wrapper">
             <Comments />
        </div>

        <div className="related-recipes-section">
            <h2>You might also like</h2>
            <div className="related-grid">
                {relatedRecipes.map(r => (
                    <Link to={`/recipe/${r.slug}`} key={r.id} className="related-card">
                        <img src={r.images.cover} alt={r.title} />
                        <h3>{r.title}</h3>
                    </Link>
                ))}
            </div>
        </div>

      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  );
};

export default RecipeDetail;
