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
    return (
      <div className="form-card max-w-xl mx-auto text-center">
        <p style={{ color: "var(--color-rose-dark)" }}>Cannot find that recipe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="section-title">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="form-card space-y-4">
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="form-label">Ingredients</label>
          {form.ingredients?.map((item, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="btn-secondary"
                style={{ padding: "0.5rem 0.75rem" }}
                aria-label="Remove ingredient"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="view-all-link"
            style={{ marginTop: "0.75rem", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            + Add ingredient
          </button>
        </div>

        <div>
          <label className="form-label">Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            className="form-input"
            rows={6}
          />
        </div>

        <div>
          <label className="form-label">Source</label>
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
