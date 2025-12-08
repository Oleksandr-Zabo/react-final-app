import React, { useState } from 'react';
import '../../Homepage/home.scss';
import './NewsletterBanner.scss';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Browser validation handles the email format check due to type="email"
    if (email) {
      setEmail('');
    }
  };

  return (
    <section className="hp-section newsletter-banner">
      <div className="newsletter-banner__inner">
        <h2 className="newsletter-banner__title">Deliciousness to your inbox</h2>
        <p className="newsletter-banner__text">Enjoy weekly hand picked recipes and recommendations</p>
        <form className="newsletter-banner__form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">JOIN</button>
        </form>
        <small className="newsletter-banner__legal">By joining our newsletter you agree to our Terms and Conditions</small>
      </div>
    </section>
  );
};

export default NewsletterBanner;