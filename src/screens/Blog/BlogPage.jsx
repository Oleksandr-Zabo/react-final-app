import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.scss';
import avatar from '../../assets/img/avatars/avatarTricia.jpg';
import shareIcon from '../../assets/img/icons/share-2.svg';
import bookmarkIcon from '../../assets/img/icons/bookmark.svg';
import playIcon from '../../assets/img/icons/play-circle.svg';
import facebookIcon from '../../assets/img/icons/facebook.svg';
import twitterIcon from '../../assets/img/icons/twitter.svg';
import instagramIcon from '../../assets/img/icons/instagram.svg';
import Comments from '../../components/Comments/Comments';

// Import images for the post content
import heroImage from '../../assets/img/blog/1.png';
import kneadingImage from '../../assets/img/blog/2.png';
import platingImage from '../../assets/img/blog/3.png';

import { getYouMightAlsoLike } from '../Homepage/recipeData';

const BlogPage = () => {
  const relatedRecipes = getYouMightAlsoLike();

  return (
    <div className="blog-page">
      <div className="container">
        <header className="blog-header">
          <h1 className="blog-title">A full guide for a better and smarter cooking</h1>
          <div className="blog-meta">
            <div className="author-info">
              <img src={avatar} alt="Tricia Albert" className="author-avatar" />
              <span className="author-name">Tricia Albert</span>
              <span className="post-date">Yesterday</span>
              <span className="comment-count">25</span>
            </div>
            <div className="post-actions">
              <button className="action-btn"><img src={shareIcon} alt="Share" /></button>
              <button className="action-btn"><img src={bookmarkIcon} alt="Save" /></button>
            </div>
          </div>
        </header>

        <div className="blog-content">
          <p className="intro-text">
            One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!
          </p>

          <div className="media-block hero-video">
            <img src={heroImage} alt="Cooking Video" />
            <div className="play-button">
              <img src={playIcon} alt="Play" />
            </div>
          </div>

          <section className="content-section">
            <h2>Before you begin</h2>
            <p>
              Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk.
            </p>
          </section>

          <section className="content-section two-col">
            <div className="text-col">
              <h2>Here are the basics</h2>
              <p>
                Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly.
              </p>
              <p>
                slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece, fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.
              </p>
            </div>
            <div className="image-col">
              <img src={kneadingImage} alt="Kneading dough" />
            </div>
          </section>

          <blockquote className="quote-block">
            “One cannot think well, love well, sleep well, if one has not dined well.”
            <cite>— Virginia Woolf, A Room of One's Own</cite>
          </blockquote>

          <section className="content-section">
            <h2>In the kitchen</h2>
            <p>
              Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment, then slices taco. Minutes undisturbed cuisine lunch magnificent mustard curry. Juicy share baking sheet pork. Meals ramen rarities selection, raw pastries richness magnificent atmosphere. Sweet soften dinners, cover mustard infused skillet, Skewers on culinary experience.
            </p>
            <p>
              Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece, fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.
            </p>
            <p>
              Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in meat, excess chef end. sweet effortlessly pork, low heat smoker soy sauce flavor meat, rice fruit fruit. Romantic fall-off-the-bone butternut chuck rice burgers.
            </p>
          </section>

          <div className="media-block full-width">
            <img src={platingImage} alt="Plating food" />
          </div>

          <section className="content-section">
            <p>
              Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment, then slices taco. Minutes undisturbed cuisine lunch magnificent mustard curry. Juicy share baking sheet pork. Meals ramen rarities selection, raw pastries richness magnificent atmosphere. Sweet soften dinners, cover mustard infused skillet, Skewers on culinary experience.
            </p>
            <p>
              Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece, fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.
            </p>
            <p>
              Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in meat, excess chef end. sweet effortlessly pork, low heat smoker soy sauce flavor meat, rice fruit fruit. Romantic fall-off-the-bone butternut chuck rice burgers.
            </p>
          </section>

          <div className="author-box">
            <div className="author-box-content">
                <img src={avatar} alt="Julie Gomez" className="author-avatar-large" />
                <div className="author-details">
                    <h3>Julie Gomez</h3>
                    <span className="role">Editor in chief</span>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <div className="social-links">
                        <button className="social-btn"><img src={facebookIcon} alt="FB" /></button>
                        <button className="social-btn"><img src={twitterIcon} alt="TW" /></button>
                        <button className="social-btn"><img src={instagramIcon} alt="IG" /></button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <Comments />

        <div className="related-posts">
            <h2>You might also like</h2>
            <div className="related-grid">
                {relatedRecipes.map(recipe => (
                    <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="related-card">
                        <div className="card-image">
                            <img src={recipe.images.cover} alt={recipe.title} />
                        </div>
                        <h3 className="card-title">{recipe.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
