import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeBySlug } from '../Homepage/recipeData';
import '../Homepage/home.scss';

const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);
  if (!recipe) {
    return (
      <main className="page-content">
        <h1>Not Found</h1>
        <p>No recipe matches slug: {slug}</p>
        <Link to="/">Go Home</Link>
      </main>
    );
  }
  return (
    <main className="page-content recipe-detail">
      <div className="recipe-detail__hero">
        <img src={recipe.images.cover} alt={recipe.title} className="recipe-detail__image" />
        <div className="recipe-detail__intro">
          <h1 className="recipe-detail__title">{recipe.title}</h1>
          <p className="recipe-detail__desc">{recipe.description}</p>
          <div className="recipe-detail__meta">
            <span>⭐ {recipe.rating} ({recipe.reviewsCount} reviews)</span>
            <span>⏱ {recipe.totalTime} total</span>
            <span>⚙️ {recipe.difficulty}</span>
          </div>
        </div>
      </div>
      <section className="recipe-detail__body">
        <h2>Ingredients</h2>
        {recipe.ingredients.map((group, idx) => (
          <div key={group.group || idx} className="recipe-detail__group">
            <h3>{group.group}</h3>
            <ul>
              {group.items.map((item, i) => (
                <li key={item.id || i}>{item.qty}{item.unit} {item.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h2>Steps</h2>
        <ol className="recipe-detail__steps">
          {recipe.steps.map((s,i)=>(
            <li key={i}>{s.text}</li>
          ))}
        </ol>
      </section>
      <div className="recipe-detail__back">
        <Link to="/">← Back to Home</Link>
      </div>
    </main>
  );
};

export default RecipeDetail;
