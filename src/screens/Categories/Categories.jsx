import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../Homepage/recipeData';
import './Categories.scss';

const Categories = () => {
  const categories = getAllCategories();

  return (
    <div className="categories-page">
      <h1 className="page-title">Categories</h1>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-item">
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} />
            </div>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
