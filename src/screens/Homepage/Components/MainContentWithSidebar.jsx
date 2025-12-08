import React from 'react';
import { Link } from 'react-router-dom';
import '../../Homepage/home.scss';
import './MainContentWithSidebar.scss';
import avatar from '../../../assets/img/avatars/avatarTara.png'; 
import InstagramWidget from './InstagramWidget';

const MainContentWithSidebar = ({ featured, list, fresh }) => {
  return (
    <section className="main-content-sidebar hp-section">
      <h2 className="hp-title">Latest Recipes</h2>
      
      <div className="content-grid">
        {/* Left Column */}
        <div className="main-column">
          {/* Featured Large Card */}
          <Link to={`/recipe/${featured.slug}`} className="featured-large-card">
            <div className="featured-large-card__image-wrapper">
              <img src={featured.images.cover} alt={featured.title} />
            </div>
            <div className="featured-large-card__content">
              <div className="rating">
                {'★'.repeat(Math.round(featured.rating))}
                <span className="rating-inactive">{'★'.repeat(5 - Math.round(featured.rating))}</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="meta">
                {featured.author && (
                  <span className="author">
                    <img src={featured.author.avatar} alt={featured.author.name} />
                    {featured.author.name}
                  </span>
                )}
                <span className="date">Yesterday</span>
              </div>
            </div>
          </Link>

          {/* List of Horizontal Cards */}
          <div className="recipe-list">
            {list.map(recipe => (
              <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="recipe-list-item">
                <div className="recipe-list-item__image">
                  <img src={recipe.images.cover} alt={recipe.title} />
                </div>
                <div className="recipe-list-item__content">
                  <div className="rating">
                    {'★'.repeat(Math.round(recipe.rating))}
                    <span className="rating-inactive">{'★'.repeat(5 - Math.round(recipe.rating))}</span>
                  </div>
                  <h4>{recipe.title}</h4>
                  <div className="meta">
                    {recipe.author && (
                      <span className="author">
                        <img src={recipe.author.avatar} alt={recipe.author.name} />
                        {recipe.author.name}
                      </span>
                    )}
                    <span className="date">Yesterday</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="sidebar">
          {/* Author Widget */}
          <div className="sidebar-widget author-widget">
            <div className="author-avatar">
              <img src={avatar} alt="Tara" />
            </div>
            <h3>Hi, I'm Tara</h3>
            <p>I'm a former dentist with a big passion for food, now I'm full time food blogger. I love exploring new cooking techniques as well as easy and fun recipes.</p>
            <Link to="/blog-post" className="btn-outline">Read More</Link>
          </div>

          {/* Fresh Recipes Widget */}
          <div className="sidebar-widget fresh-recipes-widget">
            <h3>Fresh Recipes</h3>
            <div className="fresh-list">
              {fresh.map(recipe => (
                <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="fresh-item">
                  <img src={recipe.images.cover} alt={recipe.title} />
                  <div className="fresh-item__content">
                    <h5>{recipe.title}</h5>
                    <div className="rating">
                      {'★'.repeat(Math.round(recipe.rating))}
                      <span className="rating-inactive">{'★'.repeat(5 - Math.round(recipe.rating))}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <InstagramWidget />
        </aside>
      </div>
    </section>
  );
};

export default MainContentWithSidebar;
