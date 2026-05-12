import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CookbookProvider } from "./context/CookbookContext";
import { RecipeProvider } from "./context/RecipeContext";

// Pages
import App from "./App";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import AllCookbooksPage from "./pages/AllCookbooksPage";
import BookDetail from "./pages/BookDetail";
import EditCookbook from "./pages/EditCookbook";
import RecipesPage from "./pages/RecipePage";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";
import MealPlannerPage from "./pages/MealPlannerPage";
import AboutDemo from "./components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "cookbooks", element: <AllCookbooksPage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "cookbook/:id", element: <BookDetail /> },
      { path: "cookbook/:id/edit", element: <EditCookbook /> },
      { path: "recipe/:id", element: <RecipeDetail /> },
      { path: "recipe/:id/edit", element: <EditRecipe /> },
      { path: "about", element: <AboutDemo /> },
      { path: "meal-planner", element: <MealPlannerPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookbookProvider>
      <RecipeProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#faf6f0",
              border: "1px solid rgba(217, 195, 166, 0.6)",
              borderRadius: "0.75rem",
              color: "#2e2a26",
              boxShadow: "0 10px 28px rgba(110, 74, 47, 0.10)",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              padding: "0.75rem 1rem",
            },
            success: {
              style: {
                border: "1px solid rgba(143, 166, 142, 0.55)",
              },
              iconTheme: {
                primary: "#8FA68E",
                secondary: "#faf6f0",
              },
            },
            error: {
              style: {
                border: "1px solid rgba(168, 120, 112, 0.55)",
              },
              iconTheme: {
                primary: "#A87870",
                secondary: "#faf6f0",
              },
            },
          }}
        />
      </RecipeProvider>
    </CookbookProvider>
    <Analytics />
  </React.StrictMode>
);
