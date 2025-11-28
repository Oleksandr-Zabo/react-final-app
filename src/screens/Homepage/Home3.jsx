import React from 'react';
import './home.scss';
import HeroFeatured from './Components/HeroFeatured';
import RecipeGridSection from './Components/RecipeGridSection';
import CategoriesStrip from './Components/CategoriesStrip';
import NewsletterBanner from './Components/NewsletterBanner';
import CollectionsGrid from './Components/CollectionsGrid';
import LatestRecipesGrid from './Components/LatestRecipesGrid';
import { 
  getAllRecipes,
  getCategories, 
  getCollections, 
  getLatestRecipes 
} from './recipeData';

const Home3 = () => {
  const allRecipes = getAllRecipes();
  
  // Mocking the "Cinnamon Apple Loaded Tart" using an existing recipe as base
  const baseFeatured = allRecipes.find(r => r.id === 'strawberry-cream-cheesecake') || allRecipes[0];
  const featured = {
    ...baseFeatured,
    title: "Cinnamon Apple Loaded Tart",
    wouldMakePercent: 85,
    // We keep the image of the cheesecake as it looks like a tart
  };
  
  // Super Delicious: 6 recipes
  const superDelicious = allRecipes.slice(0, 6);
  
  const categories = getCategories();
  const collections = getCollections();
  const latest = getLatestRecipes();

  return (
    <div className="homepage-container home3">
      <HeroFeatured recipe={featured} />
      <CategoriesStrip categories={categories} />
      <RecipeGridSection title="Super Delicious" recipes={superDelicious} />
      <CollectionsGrid collections={collections} />
      <LatestRecipesGrid initialRecipes={latest} />
      <NewsletterBanner />
    </div>
  );
};

export default Home3;
