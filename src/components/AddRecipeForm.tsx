import { useState } from "react";
import { useRecipe } from "../context/RecipeContext";
import type { RecipeInput } from "../context/RecipeContext";

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
      ingredients: ingredients.split("\n").map((line) => line.trim()).filter(Boolean),
      instructions,
      isFavorite: false,
    };

    if (onAdd) {
        await onAdd(newRecipe);
    } else {
        await addRecipe(newRecipe);
    }

    setTitle("");
    setSource("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      <input
        className="w-full border rounded px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <input
        className="w-full border rounded px-3 py-2"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source (YouTube, Family, Link...)"
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={4}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (one per line)"
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={5}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Recipe</button>
    </form>
  );
}