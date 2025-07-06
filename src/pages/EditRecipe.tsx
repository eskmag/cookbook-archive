import { useParams, useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import React, { useState, useEffect } from "react";
import type { Recipe } from "../context/RecipeContext";

export default function EditRecipe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipe();

  const recipeId = Number(id);
  const recipeToEdit = recipes.find((r) => r.id === recipeId);

  const [form, setForm] = useState<Omit<Recipe, "id">>({
    title: "",
    ingredients: [],
    instructions: "",
    source: "",
    user_id: "",
    isFavorite: false,
  });

  useEffect(() => {
    if (recipeToEdit) {
      const { id, ...rest } = recipeToEdit;
      setForm({
        ...rest,
        ingredients: recipeToEdit.ingredients ?? [],
      });
    }
  }, [recipeToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...(form.ingredients ?? [])];
    updated[index] = value;
    setForm((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleAddIngredient = () => {
    setForm((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients ?? []), ""],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    const updated = [...(form.ingredients ?? [])];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeToEdit) return;
    
    const updatedRecipe: Recipe = {
      id: recipeId,
      ...form,
    };
    
    await updateRecipe(updatedRecipe);
    navigate(`/recipe/${recipeId}`);
  };

  if (!recipeToEdit) {
    return <div className="p-6 text-red-600">Cannot find recipe</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          {form.ingredients?.map((item, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 border-gray-300 rounded-md shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 text-blue-600"
          >
            ➕ Add ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
