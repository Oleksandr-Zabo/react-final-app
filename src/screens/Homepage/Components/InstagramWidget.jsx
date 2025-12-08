import React from 'react';
import './InstagramWidget.scss';
import insta1 from '../../../assets/img/recipes/spinach-pasta.jpg';
import insta2 from '../../../assets/img/recipes/roast-chicken.jpg';
import insta3 from '../../../assets/img/recipes/okra-stew.jpg';
import insta4 from '../../../assets/img/recipes/cheesecake-large.jpg';
import insta5 from '../../../assets/img/recipes/donuts.jpg';
import insta6 from '../../../assets/img/recipes/tomato-soup.jpg';

const InstagramWidget = () => {
  // Fallback images if some don't exist, reusing what we have
  const images = [insta1, insta2, insta3, insta4, insta5, insta6];

  return (
    <div className="sidebar-widget instagram-widget">
      <div className="instagram-header">
        <div className="instagram-title">
          <h3>Instagram</h3>
          <p>@tastebite</p>
        </div>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn-follow">Follow</a>
      </div>
      
      <div className="instagram-stats">
        <div className="stat">
          <span className="count">575</span>
          <span className="label">posts</span>
        </div>
        <div className="stat">
          <span className="count">12.7K</span>
          <span className="label">followers</span>
        </div>
        <div className="stat">
          <span className="count">45</span>
          <span className="label">following</span>
        </div>
      </div>

      <div className="instagram-grid">
        {images.map((img, index) => (
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" key={index} className="instagram-item">
            <img src={img} alt={`Instagram post ${index + 1}`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramWidget;
