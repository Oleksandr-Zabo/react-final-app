import React from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './CategoriesStrip.scss';

const CategoriesStrip = ({ categories }) => {
  if (!categories || !categories.length) return null;
  return (
    <section className="hp-section categories-strip">
      <h2 className="hp-title">Popular Categories</h2>
      <div className="categories-strip__list">
        {categories.map(c => (
          <Link to={`/category/${c.id}`} key={c.id} className="categories-strip__item">
            <div className="categories-strip__avatar">
              <img src={c.image} alt={c.name} />
            </div>
            <span className="categories-strip__name">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesStrip;