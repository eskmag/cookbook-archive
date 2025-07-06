import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthContext";

export type Recipe = {
    id: number;
    user_id: string;
    title: string;
    source: string;
    ingredients: string[];
    instructions: string;
    notes?: string;
    isFavorite: boolean;
};

export type RecipeInput = Omit<Recipe, "id" | "user_id">;

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
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchRecipes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("recipes")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });
            if (error) {
                console.error("Error fetching recipes:", error);
            } else {
                // Make sure IDs are numbers
                setRecipes(
                    (data || []).map((item) => ({
                        ...item,
                        id: typeof item.id === "string" ? parseInt(item.id, 10) : item.id,
                        isFavorite: item.isFavorite || false, // Use the correct database column name
                    }))
                );
            }
            setLoading(false);
        };

        fetchRecipes();
    }, [user]);

    const addRecipe = async (recipe: RecipeInput) => {
        if (!user) return;

        const { data, error } = await supabase
            .from("recipes")
            .insert([{ ...recipe, user_id: user.id }])
            .select()
            .single();

        if (error) {
            console.error("Error saving recipe:", error);
        } else {
            setRecipes((prev) => [
                {
                    ...data,
                    id: typeof data.id === "string" ? parseInt(data.id, 10) : data.id,
                    isFavorite: data.isFavorite || false, // Use the correct database column name
                },
                ...prev,
            ]);
        }
    };

    const updateRecipe = async (updated: Recipe) => {
        const { id, ...data } = updated;

        const { error, data: updatedData } = await supabase
            .from("recipes")
            .update({
                ...data,
                isFavorite: updated.isFavorite, // Use the correct database column name
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating recipe:", error);
        } else {
            setRecipes((prev) =>
                prev.map((recipe) => (recipe.id === id ? {
                    ...updatedData,
                    id: typeof updatedData.id === "string" ? parseInt(updatedData.id, 10) : updatedData.id,
                    isFavorite: updatedData.isFavorite || false, // Use the correct database column name
                } : recipe))
            );
        }
    };

    const deleteRecipe = async (id: number) => {
        const { error } = await supabase.from("recipes").delete().eq("id", id);

        if (error) {
            console.error("Error deleting recipe:", error);
        } else {
            setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        }
    };

    const toggleFavorite = async (id: number) => {
        const recipe = recipes.find((r) => r.id === id);
        if (!recipe) return;

        const updated = !recipe.isFavorite;

        const { error } = await supabase
            .from("recipes")
            .update({ isFavorite: updated })
            .eq("id", id);

        if (error) {
            console.error("Error updating favorite:", error);
        } else {
            setRecipes((prev) =>
                prev.map((r) => (r.id === id ? { ...r, isFavorite: updated } : r))
            );
        }
    };

    return (
        <RecipeContext.Provider
            value={{ recipes, loading, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }}
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