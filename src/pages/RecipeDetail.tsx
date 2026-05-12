import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecipe } from "../context/RecipeContext";
import type { Recipe } from "../data/recipes";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipe();

  const recipeId = Number(id);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  useEffect(() => {
    if (isNaN(recipeId)) return;
    setRecipe(recipes.find((r) => r.id === recipeId));
  }, [recipeId, recipes]);

  if (isNaN(recipeId)) {
    return (
      <div className="recipe-detail max-w-2xl mx-auto text-center">
        <p style={{ color: "var(--color-rose-dark)" }}>Invalid recipe ID</p>
      </div>
    );
  }

  if (recipe === undefined) {
    return (
      <div className="recipe-detail max-w-2xl mx-auto text-center">
        <p style={{ color: "var(--color-stone)" }}>Loading recipe…</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail max-w-2xl mx-auto text-center">
        <p style={{ color: "var(--color-rose-dark)" }}>Recipe not found.</p>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmed) {
      deleteRecipe(recipeId);
      navigate("/recipes");
    }
  };

  return (
    <div className="recipe-detail max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/recipes")}
        className="view-all-link"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: "1.25rem",
          display: "inline-block",
        }}
      >
        ← Back to recipes
      </button>

      <h1>{recipe.title}</h1>
      {recipe.source && (
        <p style={{ color: "var(--color-stone)", fontStyle: "italic", marginTop: "0.25rem" }}>
          from {recipe.source}
        </p>
      )}

      <div className="instructions" style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Ingredients</h2>
          <ul className="list-disc list-inside" style={{ color: "var(--color-charcoal)", lineHeight: 1.8 }}>
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Instructions</h2>
          <p
            className="whitespace-pre-line"
            style={{ color: "var(--color-charcoal)", lineHeight: 1.75 }}
          >
            {recipe.instructions}
          </p>
        </div>
        {recipe.notes && (
          <div>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Notes</h2>
            <p style={{ color: "var(--color-stone)", lineHeight: 1.7, fontStyle: "italic" }}>
              {recipe.notes}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 flex-wrap" style={{ marginTop: "2rem" }}>
        <button
          onClick={() => navigate(`/recipe/${recipe.id}/edit`)}
          className="edit-button"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Recipe
        </button>
      </div>
    </div>
  );
}
