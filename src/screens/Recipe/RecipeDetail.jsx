import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeBySlug } from '../Homepage/recipeData';
import './RecipeDetail.scss';
import starIcon from '../../assets/img/icons/star-fill.svg';
import clockIcon from '../../assets/img/icons/clock.svg';
import chartIcon from '../../assets/img/icons/bar-chart.svg';
import Comments from '../../components/Comments/Comments';

const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);
  
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
        <div className="recipe-header">
            <h1 className="recipe-title">{recipe.title}</h1>
            <div className="recipe-meta">
                <span className="rating">
                    <img src={starIcon} alt="Rating" width="16" /> 
                    {recipe.rating} ({recipe.reviewsCount} reviews)
                </span>
                <span>
                    <img src={clockIcon} alt="Time" width="16" /> 
                    {recipe.totalTime}
                </span>
                <span>
                    <img src={chartIcon} alt="Difficulty" width="16" /> 
                    {recipe.difficulty}
                </span>
            </div>
            <p className="recipe-desc">{recipe.description}</p>
        </div>

        <img src={recipe.images.cover} alt={recipe.title} className="recipe-hero-image" />

        <div className="recipe-content">
            <div className="ingredients-section">
                <h2>Ingredients</h2>
                {recipe.ingredients.map((group, idx) => (
                <div key={group.group || idx} className="ingredient-group">
                    {group.group && <h3>{group.group}</h3>}
                    <ul>
                    {group.items.map((item, i) => (
                        <li key={item.id || i}>
                            {item.qty && `${item.qty} `}{item.unit && `${item.unit} `}{item.name}
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>

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

            <Comments />
        </div>

        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </main>
  );
};

export default RecipeDetail;
