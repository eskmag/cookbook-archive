import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CookbookProvider } from "./context/CookbookContext";
import { RecipeProvider } from "./context/RecipeContext"; // 👈 Importér denne

// Pages
import App from "./App"; // fungerer som "layout"
import HomePage from "./pages/HomePage";
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
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
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
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(254, 247, 240, 0.95)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(238, 203, 173, 0.3)',
                borderRadius: '1rem',
                color: 'rgba(101, 67, 33, 0.95)',
                boxShadow: '0 8px 32px rgba(184, 134, 91, 0.15)',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                style: {
                  border: '1px solid rgba(144, 238, 144, 0.4)',
                  background: 'rgba(240, 255, 240, 0.95)',
                },
                iconTheme: {
                  primary: '#90ee90',
                  secondary: 'white',
                },
              },
              error: {
                style: {
                  border: '1px solid rgba(240, 128, 128, 0.4)',
                  background: 'rgba(255, 240, 240, 0.95)',
                },
                iconTheme: {
                  primary: '#f08080',
                  secondary: 'white',
                },
              },
            }}
          />
        </RecipeProvider>
      </CookbookProvider>
    </AuthProvider>
    <Analytics />
  </React.StrictMode>
);
