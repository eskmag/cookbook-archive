import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CookbookProvider } from "./context/CookbookContext";
import { RecipeProvider } from "./context/RecipeContext"; // 👈 Importér denne

// Pages
import App from "./App"; // fungerer som "layout"
import FavoritesPage from "./pages/FavoritesPage";
import AllCookbooksPage from "./pages/AllCookbooksPage";
import BookDetail from "./pages/BookDetail";
import EditCookbook from "./pages/EditCookbook";
import RecipesPage from "./pages/RecipePage";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./components/UserProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <FavoritesPage /> },
      { path: "cookbooks", element: <AllCookbooksPage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "cookbook/:id", element: <BookDetail /> },
      { path: "cookbook/:id/edit", element: <EditCookbook /> },
      { path: "recipe/:id", element: <RecipeDetail /> },
      { path: "recipe/:id/edit", element: <EditRecipe /> },
      { path: "profile", element: <UserProfile /> }, 
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CookbookProvider>
        <RecipeProvider> {/* 👈 Pakk inn RouterProvider her */}
          <RouterProvider router={router} />
        </RecipeProvider>
      </CookbookProvider>
    </AuthProvider>
  </React.StrictMode>
);
