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
    const found = recipes.find((r) => r.id === recipeId);
    setRecipe(found);
  }, [recipeId, recipes]);

  if (isNaN(recipeId)) {
    return <div className="p-6 text-red-600">Invalid recipe ID</div>;
  }

  if (recipe === undefined) {
    return <div className="p-6 text-gray-500">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="p-6 text-red-600">Recipe not found 😢</div>;
  }

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmed) {
      deleteRecipe(recipeId);
      navigate("/recipes");
    }
  };

  return (
    <div className="recipe-detail">
      <button
        className="text-blue-600 hover:underline"
        onClick={() => navigate("/recipes")}
      >
        ← Back to recipes
      </button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-blue-900">{recipe.title}</h1>
        {recipe.source && (
          <p className="Source">
            Soruce: {recipe.source}
          </p>
        )}
      </div>

      <div className="instructions">
        <div>
          <h2 className="text-xl font-semibold text-blue-700">🧂 Ingredients</h2>
          <ul className="list-disc list-inside text-gray-800">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700">👨‍🍳 Instructions</h2>
          <p className="whitespace-pre-line text-gray-800">{recipe.instructions}</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleDelete}
          className="delete-button"
        >
          Delete Recipe
        </button>
        <button
          onClick={() => navigate(`/recipe/${recipe.id}/edit`)}
          className="edit-button"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
