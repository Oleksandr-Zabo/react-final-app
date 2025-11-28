import recipesData from '../../assets/data/recipes.json';

// Import images
import spinachPasta from '../../assets/img/recipes/spinach-pasta.jpg';
import roastChicken from '../../assets/img/recipes/roast-chicken.jpg';
import okraStew from '../../assets/img/recipes/okra-stew.jpg';
import cheesecakeLarge from '../../assets/img/recipes/cheesecake-large.jpg';
import bananaSmoothie from '../../assets/img/recipes/banana-smoothie.jpg';
import breakfastBurger from '../../assets/img/recipes/breakfast-burger.jpg';
import donuts from '../../assets/img/recipes/donuts.jpg';
import tomatoSoup from '../../assets/img/recipes/tomato-soup.jpg';
import guacamole from '../../assets/img/recipes/guacamole.jpg';
import avatar from '../../assets/img/avatars/avatar.jpg';

const imageMap = {
  'assets/img/recipes/spinach-pasta.jpg': spinachPasta,
  'assets/img/recipes/roast-chicken.jpg': roastChicken,
  'assets/img/recipes/okra-stew.jpg': okraStew,
  'assets/img/recipes/cheesecake-large.jpg': cheesecakeLarge,
  'assets/img/recipes/banana-smoothie.jpg': bananaSmoothie,
  'assets/img/recipes/breakfast-burger.jpg': breakfastBurger,
  'assets/img/recipes/donuts.jpg': donuts,
  'assets/img/recipes/tomato-soup.jpg': tomatoSoup,
  'assets/img/recipes/guacamole.jpg': guacamole,
  'assets/img/avatars/avatar.jpg': avatar
};

const resolveImage = (path) => {
  return imageMap[path] || path;
};

const recipes = recipesData.map(recipe => ({
  ...recipe,
  author: recipe.author ? {
    ...recipe.author,
    avatar: resolveImage(recipe.author.avatar)
  } : undefined,
  images: recipe.images ? {
    cover: resolveImage(recipe.images.cover),
    gallery: recipe.images.gallery ? recipe.images.gallery.map(resolveImage) : []
  } : undefined,
  comments: recipe.comments ? recipe.comments.map(comment => ({
    ...comment,
    avatar: resolveImage(comment.avatar)
  })) : []
}));

export const getAllRecipes = () => recipes;
export const getFeaturedRecipe = () => recipes.find(r => r.id === 'strawberry-cream-cheesecake') || recipes[0];
export const getTopRecipes = (count = 3) => recipes.slice(1, 1 + count); // skip featured
export const getSweetTooth = (count = 3) => recipes.slice(4, 4 + count); // arbitrary slice
export const getCategories = () => [
  { id: 'pasta', name: 'Pasta', image: spinachPasta },
  { id: 'pizza', name: 'Pizza', image: roastChicken },
  { id: 'vegan', name: 'Vegan', image: okraStew },
  { id: 'desserts', name: 'Desserts', image: cheesecakeLarge },
  { id: 'smoothies', name: 'Smoothies', image: bananaSmoothie },
  { id: 'breakfast', name: 'Breakfast', image: breakfastBurger }
];

export const getAllCategories = () => [
  { id: 'seafood', name: 'Seafood', image: okraStew },
  { id: 'soup', name: 'Soup', image: tomatoSoup },
  { id: 'pancakes', name: 'Pancakes', image: donuts },
  { id: 'meat', name: 'Meat', image: roastChicken },
  { id: 'chicken', name: 'Chicken', image: roastChicken },
  { id: 'less-30', name: 'Less than 30 min', image: spinachPasta },
  { id: 'pasta', name: 'Pasta', image: spinachPasta },
  { id: 'pizza', name: 'Pizza', image: spinachPasta },
  { id: 'cake', name: 'Cake', image: cheesecakeLarge },
  { id: 'pastries', name: 'Pastries', image: donuts },
  { id: 'burger', name: 'Burger', image: breakfastBurger },
  { id: 'vegan', name: 'Vegan', image: guacamole },
  { id: 'desserts', name: 'Desserts', image: cheesecakeLarge },
  { id: 'smoothies', name: 'Smoothies', image: bananaSmoothie },
  { id: 'breakfast', name: 'Breakfast', image: breakfastBurger },
  { id: 'salad', name: 'Salad', image: guacamole },
  { id: 'sandwiches', name: 'Sandwiches', image: breakfastBurger },
  { id: 'waffles', name: 'Waffles', image: donuts },
  { id: 'ramen', name: 'Ramen', image: okraStew },
  { id: 'dips', name: 'Dips', image: guacamole }
];

export const getCollections = () => [
  { id: 'sushi-combos', title: 'Sushi Combos for your Next Party', image: roastChicken, count: 156 },
  { id: 'everything-bagel', title: 'Everything Bagel', image: donuts, count: 156 },
  { id: 'cook-like-a-chef', title: 'Cook Like a Chef', image: cheesecakeLarge, count: 156 },
  { id: 'exquisite-dinner', title: 'Exquisite Dinner Recipe Ideas', image: okraStew, count: 156 },
  { id: 'cookie-frenzy', title: 'The Ultimate Cookie Frenzy', image: bananaSmoothie, count: 156 },
  { id: 'for-love-donuts', title: 'For the Love of Donuts', image: donuts, count: 156 }
];
export const getLatestRecipes = (count = 18) => recipes.slice(2, 2 + count);
export const getRecipeBySlug = (slug) => recipes.find(r => r.slug === slug);