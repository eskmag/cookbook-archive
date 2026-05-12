import React, { createContext, useContext, useRef, useState } from "react";
import { recipes as seedRecipes } from "../data/recipes";

export type Recipe = {
    id: number;
    title: string;
    source: string;
    ingredients: string[];
    instructions: string;
    notes?: string;
    isFavorite: boolean;
};

export type RecipeInput = Omit<Recipe, "id">;

type RecipeContextType = {
    recipes: Recipe[];
    loading: boolean;
    addRecipe: (recipe: RecipeInput) => Promise<void>;
    deleteRecipe: (id: number) => Promise<void>;
    updateRecipe: (recipe: Recipe) => Promise<void>;
    toggleFavorite: (id: number) => Promise<void>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>(seedRecipes);
    const nextId = useRef(
        seedRecipes.reduce((max, r) => Math.max(max, r.id), 0) + 1
    );

    const addRecipe = async (recipe: RecipeInput) => {
        setRecipes((prev) => [{ ...recipe, id: nextId.current++ }, ...prev]);
    };

    const updateRecipe = async (updated: Recipe) => {
        setRecipes((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r))
        );
    };

    const deleteRecipe = async (id: number) => {
        setRecipes((prev) => prev.filter((r) => r.id !== id));
    };

    const toggleFavorite = async (id: number) => {
        setRecipes((prev) =>
            prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
        );
    };

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                loading: false,
                addRecipe,
                updateRecipe,
                deleteRecipe,
                toggleFavorite,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipe must be used within a RecipeProvider");
    }
    return context;
};
