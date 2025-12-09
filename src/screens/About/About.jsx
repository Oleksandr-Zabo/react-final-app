import React from 'react';
import './About.scss';
import facebook from '../../assets/img/icons/facebook.svg';
import twitter from '../../assets/img/icons/twitter.svg';
import instagram from '../../assets/img/icons/instagram.svg';

import introImage from '../../assets/img/about-page/Intro.png';
import contentExample from '../../assets/img/about-page/ContentExample.png';
import member1 from '../../assets/img/about-page/HamChuwon.png';
import member2 from '../../assets/img/about-page/IzabellaTabakova.png';
import member3 from '../../assets/img/about-page/FatimaDelgadillo.png';
import member4 from '../../assets/img/about-page/HarrisonPhillips.png';
import member5 from '../../assets/img/about-page/PabloCambeiro.png';
import member6 from '../../assets/img/about-page/CorabelleDurrad.png';
import member7 from '../../assets/img/about-page/NonkosiJoyi.png';
import member8 from '../../assets/img/about-page/WenYahui.png';
import member9 from '../../assets/img/about-page/JurrienOldhof.png';
import member10 from '../../assets/img/about-page/TallahCotton.png';
import member11 from '../../assets/img/about-page/QinShi.png';
import member12 from '../../assets/img/about-page/SuHua.png';

const About = () => {
  const teamMembers = [
    { name: 'Ham Chuwon', role: 'Chef Extraordinaire', image: member1 },
    { name: 'Izabella Tabakova', role: 'Chef Extraordinaire', image: member2 },
    { name: 'Fatima Delgadillo', role: 'Chef Extraordinaire', image: member3 },
    { name: 'Harrison Phillips', role: 'Chef Extraordinaire', image: member4 },
    { name: 'Pablo Cambeiro', role: 'Chef Extraordinaire', image: member5 },
    { name: 'Corabelle Durrad', role: 'Chef Extraordinaire', image: member6 },
    { name: 'Nonkosi Joyi', role: 'Chef Extraordinaire', image: member7 },
    { name: 'Wen Yahui', role: 'Chef Extraordinaire', image: member8 },
    { name: 'Jurrien Oldhof', role: 'Chef Extraordinaire', image: member9 },
    { name: 'Tallah Cotton', role: 'Chef Extraordinaire', image: member10 },
    { name: 'Qin Shi', role: 'Chef Extraordinaire', image: member11 },
    { name: 'Su Hua', role: 'Chef Extraordinaire', image: member12 },
  ];

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About</h1>
        
        <section className="intro-section">
          <h2 className="headline">We’re a group of foodies who love cooking and the internet</h2>
          <div className="intro-image">
            <img src={introImage} alt="Foodies" />
          </div>
          <p className="intro-text">
            Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk.
          </p>
        </section>

        <section className="simple-recipes-section">
          <div className="content">
            <h2>Simple, Easy Recipes for all</h2>
            <p>
              Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece.
            </p>
          </div>
          <div className="image">
             <img src={contentExample} alt="Blueberries" />
          </div>
        </section>

        <section className="team-section">
          <h2>An incredible team of talented chefs and foodies</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
               <div key={index} className="team-member">
                 <div className="avatar">
                   <img src={member.image} alt={member.name} />
                 </div>
                 <h3>{member.name}</h3>
                 <p>{member.role}</p>
               </div>
            ))}
          </div>
        </section>

        <section className="operating-section">
          <div className="operating-content">
            <h3>Operatring from NYC, Dubai and London</h3>
            <p>
              Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will mald. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment.
            </p>
            <div className="social-icons">
              <button type="button" onClick={() => {}}><img src={facebook} alt="Facebook" /></button>
              <button type="button" onClick={() => {}}><img src={twitter} alt="Twitter" /></button>
              <button type="button" onClick={() => {}}><img src={instagram} alt="Instagram" /></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
