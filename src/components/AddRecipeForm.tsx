import { useState } from "react";
import { useRecipe } from "../context/RecipeContext";
import type { RecipeInput } from "../context/RecipeContext";
import toast from "react-hot-toast";

type Props = {
  onAdd?: (recipe: RecipeInput) => Promise<void>;
};

export default function AddRecipeForm({ onAdd }: Props) {
  const { addRecipe } = useRecipe();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructions) return;

    const newRecipe: RecipeInput = {
      title,
      source,
      ingredients: ingredients
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      instructions,
      isFavorite: false,
    };

    try {
      if (onAdd) {
        await onAdd(newRecipe);
      } else {
        await addRecipe(newRecipe);
      }

      toast.success("Recipe added successfully! 🍳", {
        duration: 3000,
      });

      setTitle("");
      setSource("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      toast.error("Failed to add recipe");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card space-y-4 max-w-2xl mx-auto">
      <input
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        required
      />
      <input
        className="form-input"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source (cookbook, link, family…)"
      />
      <textarea
        className="form-input"
        rows={4}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (one per line)"
      />
      <textarea
        className="form-input"
        rows={5}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
      />
      <button type="submit" className="btn-primary">
        Add Recipe
      </button>
    </form>
  );
}
