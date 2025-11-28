import React from 'react';
import { getAllCategories } from '../Homepage/recipeData';
import './Categories.scss';

const Categories = () => {
  const categories = getAllCategories();

  return (
    <div className="categories-page">
      <h1 className="page-title">Categories</h1>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} />
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
