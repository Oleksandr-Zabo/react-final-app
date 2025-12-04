import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getRecipesByCategory } from '../Homepage/recipeData';
import './CategoryDetail.scss';
import heartIcon from '../../assets/img/icons/heart.svg';
import heartFillIcon from '../../assets/img/icons/heart fill.svg';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState('newest');
  const [likedRecipes, setLikedRecipes] = useState({});

  useEffect(() => {
    const cat = getCategoryById(id);
    if (cat) {
      setCategory(cat);
      // In a real app, we might fetch recipes from an API
      // For now, we filter the static list
      // We can also try to match by name if ID doesn't match tags exactly
      let relatedRecipes = getRecipesByCategory(id);
      
      // Fallback: if no recipes found by ID, try finding by name (e.g. "Desserts" -> "dessert")
      if (relatedRecipes.length === 0) {
         // Simple heuristic: remove 's' at the end
         const singular = id.endsWith('s') ? id.slice(0, -1) : id;
         relatedRecipes = getRecipesByCategory(singular);
      }
      
      // If still empty, maybe show all for demo purposes or handle empty state
      // For the "Desserts" example, let's ensure we get some data if possible
      
      setRecipes(relatedRecipes);
    }
  }, [id]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Implement sorting logic here if needed
    // For now just updating state
  };

  const toggleLike = (e, recipeId) => {
    e.preventDefault();
    setLikedRecipes(prev => ({
        ...prev,
        [recipeId]: !prev[recipeId]
    }));
  };

  if (!category) {
    return <div className="category-page-error">Category not found</div>;
  }

  const visibleRecipes = recipes.slice(0, visibleCount);

  return (
    <div className="category-detail-page">
      <div className="category-banner">
        {category.image && <img src={category.image} alt={category.name} />}
      </div>

      <div className="category-header container">
        <h1 className="category-title">{category.name}</h1>
        <span className="recipe-count">({recipes.length} Recipes)</span>
        <p className="category-desc">
          One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. 
          Here is a recipe I created after having this dish in a restaurant. Enjoy!
        </p>
        
        <div className="filter-bar">
            <span className="sort-label">Sort by:</span>
            <select className="sort-dropdown" value={sortOption} onChange={handleSortChange}>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
            </select>
        </div>
      </div>

      <div className="category-content container">
        <div className="recipes-grid">
            {visibleRecipes.map(recipe => (
                <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="recipe-card">
                    <div className="image-wrapper">
                        <img src={recipe.images.cover} alt={recipe.title} />
                        <button 
                            className={`like-btn ${likedRecipes[recipe.id] ? 'liked' : ''}`}
                            onClick={(e) => toggleLike(e, recipe.id)}
                        >
                            <img src={likedRecipes[recipe.id] ? heartFillIcon : heartIcon} alt="Like" />
                        </button>
                    </div>
                    <h3 className="recipe-title">{recipe.title}</h3>
                </Link>
            ))}
        </div>

        {visibleCount < recipes.length && (
            <div className="load-more-container">
                <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 12)}>
                    Load More
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
