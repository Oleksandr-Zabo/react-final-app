import React from 'react';
import '../../Homepage/home.scss';
import './CollectionsGrid.scss';

const CollectionsGrid = ({ collections }) => {
  if (!collections || !collections.length) return null;
  return (
    <section className="hp-section collections-grid">
      <h2 className="hp-title">Hand-Picked Collections</h2>
      <div className="collections-grid__wrap hp-grid-2">
        {collections.map(c => (
          <article key={c.id} className="collection-card">
            <div className="collection-card__image-wrap"><img src={c.image} alt={c.title} /></div>
            <div className="collection-card__body">
              <h3 className="collection-card__title">{c.title}</h3>
              <span className="pill">{c.count} Recipes</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;