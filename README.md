# React Final App

A modern, responsive recipe application built with React. This project demonstrates a feature-rich user interface for browsing recipes, exploring categories, reading blog posts, and managing user preferences.

🔗 **Live Demo:** [https://oleksandr-zabo.github.io/react-final-app/](https://oleksandr-zabo.github.io/react-final-app/)

## 🚀 Features

*   **Homepage**: A dynamic landing page featuring a hero carousel, "Super Delicious" top recipes, category browsing, curated collections, and the latest recipes.
*   **Recipe Details**: Comprehensive recipe pages including:
    *   Hero image and video support.
    *   Preparation time, cooking time, and servings.
    *   Interactive ingredient checklist.
    *   Nutritional information.
    *   Step-by-step cooking instructions.
    *   "You might also like" recommendations.
*   **Categories**: Browse recipes by diverse categories such as Breakfast, Vegan, Meat, Dessert, Lunch, and Chocolate.
*   **Search**: Global search functionality to quickly find recipes by name.
*   **Blog**: A dedicated section for culinary articles, tips, and guides with comment functionality.
*   **Favorites**: Ability to "heart" recipes and save them to a Favorites list (persisted via LocalStorage).
*   **User Profile**: A profile section to manage user details (simulated authentication).
*   **Authentication**: Global login and signup modals (simulated).
*   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React](https://reactjs.org/) (v18+)
*   **Routing**: [React Router v6](https://reactrouter.com/)
*   **Styling**: [SASS/SCSS](https://sass-lang.com/) (Modules & Global styles)
*   **State Management**: React Context API & Hooks (`useState`, `useEffect`, `useContext`)
*   **Data Persistence**: Browser `localStorage` for user profile, favorites, and comments.
*   **Build Tool**: Create React App (Webpack)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Oleksandr-Zabo/react-final-app.git
    cd react-final-app/final-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

## 🚀 Deployment

This project is configured for deployment on GitHub Pages.

1.  **Build and Deploy**
    ```bash
    npm run deploy
    ```
    This command creates a production build and pushes it to the `gh-pages` branch.

## 📂 Project Structure

```
src/
├── assets/          # Images, icons, and data files (JSON, SCSS variables)
├── components/      # Reusable UI components (Header, Footer, Modals, etc.)
├── context/         # React Context definitions (AuthModalContext)
├── screens/         # Page components (Homepage, Recipe, Profile, etc.)
├── App.js           # Main application component and routing
├── index.js         # Entry point
└── ...
```

## 🎨 Design

The application follows a clean, "Foodieland" inspired design aesthetic with a focus on high-quality imagery, clear typography (Playfair Display & Inter), and a warm color palette.

---

*Developed by Oleksandr Zabo*
