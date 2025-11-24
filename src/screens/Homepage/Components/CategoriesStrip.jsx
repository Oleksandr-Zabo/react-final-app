import React from 'react';
import '../../Homepage/home.module.scss';
import './CategoriesStrip.scss';

const CategoriesStrip = ({ categories }) => {
  if (!categories || !categories.length) return null;
  return (
    <section className="hp-section categories-strip">
      <h2 className="hp-title">Popular Categories</h2>
      <div className="categories-strip__list">
        {categories.map(c => (
          <div key={c.id} className="categories-strip__item">
            <div className="categories-strip__avatar">
              <img src={c.image} alt={c.name} />
            </div>
            <span className="categories-strip__name">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesStrip;