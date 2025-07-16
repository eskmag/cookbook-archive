import { useRecipe } from "../context/RecipeContext";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeCard from "../components/RecipeCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useState } from "react";

export default function AllCookbooksPage() {
  const { recipes, addRecipe, loading } = useRecipe();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = recipes.filter((recipe) => {
    const q = search.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(q) ||
      recipe.source.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">🧾 All Recipes</h1>

      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="toggle-form-button"
        >
          {showForm ? (
            <>
              <span>✕</span> Close Form
            </>
          ) : (
            <>
              <span>+</span> Add New Recipe
            </>
          )}
        </button>
      </div>

      {showForm && <AddRecipeForm onAdd={addRecipe} />}

      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search in recipes..."
          className="w-full max-w-sm px-4 py-2 border rounded-md"
        />
      </div>

      {/* Single column on mobile, 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <SkeletonGrid count={6} type="recipe" />
        ) : filtered.length > 0 ? (
          filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-4">Start building your recipe collection</p>
          </div>
        )}
      </div>
    </div>
  );
}
