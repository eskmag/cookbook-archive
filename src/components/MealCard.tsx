import { Link } from "react-router-dom";
import type { Recipe } from "../context/RecipeContext";

interface MealCardProps {
  day: string;
  recipe: Recipe | null;
  onSuggest: () => void;
  onChoose: () => void;
  onClear: () => void;
}

export default function MealCard({ day, recipe, onSuggest, onChoose, onClear }: MealCardProps) {
  return (
    <div className="meal-card">
      <h3 className="text-xl font-semibold mb-2 text-stone-600">{day}</h3>
      {recipe ? (
        <div className="flex-grow">
          <div className="w-full h-32 rounded-md mb-2 flex items-center justify-center bg-gradient-to-br from-amber-100 to-stone-200">
            <span className="text-4xl">🍽️</span>
          </div>
          <p className="font-medium text-stone-800">{recipe.title}</p>
          <p className="text-xs text-stone-500 mb-1">{recipe.source}</p>
          <Link to={`/recipe/${recipe.id}`} className="text-sm text-amber-600 hover:underline">
            View Recipe
          </Link>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-stone-500 min-h-[160px]">
          <p>No meal planned.</p>
        </div>
      )}
      <div className="mt-4 flex flex-col space-y-2">
        <button onClick={onChoose} className="meal-card-button">
          {recipe ? "Change Meal" : "Choose Meal"}
        </button>
        <button onClick={onSuggest} className="meal-card-button">
          Suggest a Meal
        </button>
        {recipe && (
          <button onClick={onClear} className="meal-card-button">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
