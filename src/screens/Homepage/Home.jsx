import React from 'react';
import './home.module.scss';
import HeroFeatured from './Components/HeroFeatured';
import RecipeGridSection from './Components/RecipeGridSection';
import CategoriesStrip from './Components/CategoriesStrip';
import NewsletterBanner from './Components/NewsletterBanner';
import CollectionsGrid from './Components/CollectionsGrid';
import LatestRecipesGrid from './Components/LatestRecipesGrid';
import { 
  getFeaturedRecipe, 
  getTopRecipes, 
  getSweetTooth, 
  getCategories, 
  getCollections, 
  getLatestRecipes 
} from './recipeData';

const Home = () => {
  const featured = getFeaturedRecipe();
  const superDelicious = getTopRecipes();
  const sweetTooth = getSweetTooth();
  const categories = getCategories();
  const collections = getCollections();
  const latest = getLatestRecipes();

  return (
    <div className="homepage-container">
      <HeroFeatured recipe={featured} />
      <RecipeGridSection title="Super Delicious" recipes={superDelicious} />
      <RecipeGridSection title="Sweet Tooth" recipes={sweetTooth} />
      <CategoriesStrip categories={categories} />
      <NewsletterBanner />
      <CollectionsGrid collections={collections} />
      <LatestRecipesGrid initialRecipes={latest} />
    </div>
  );
};

export default Home;
