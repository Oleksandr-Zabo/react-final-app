import React from 'react';
import './home.scss';
import NewsletterBanner from './Components/NewsletterBanner';
import CollectionsGrid from './Components/CollectionsGrid';
import LatestRecipesGrid from './Components/LatestRecipesGrid';
import HeroThreeCol from './Components/HeroThreeCol';
import MainContentWithSidebar from './Components/MainContentWithSidebar';
import { getAllRecipes, getCollections, getLatestRecipes } from './recipeData';

const Home2 = () => {
  const allRecipes = getAllRecipes();
  // Mocking data selection to match design roughly
  const heroRecipes = allRecipes.slice(4, 7); // Pick 3 recipes
  const mainFeatured = allRecipes[0]; // Pumpkin Marshmallow Pie (or similar)
  const mainList = allRecipes.slice(1, 5); // 4 recipes for list
  const freshRecipes = allRecipes.slice(5, 8); // 3 recipes for sidebar
  const collections = getCollections();
  const latest = getLatestRecipes();

  return (
    <div className="homepage-container home2">
      <HeroThreeCol recipes={heroRecipes} />
      <NewsletterBanner />
      <MainContentWithSidebar 
        featured={mainFeatured} 
        list={mainList} 
        fresh={freshRecipes} 
      />
      <CollectionsGrid collections={collections} />
      <LatestRecipesGrid initialRecipes={latest} />
    </div>
  );
};

export default Home2;
