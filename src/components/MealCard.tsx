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
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "1.25rem",
          color: "var(--color-charcoal)",
          marginBottom: "0.75rem",
        }}
      >
        {day}
      </h3>
      {recipe ? (
        <div className="flex-grow">
          <div
            className="w-full h-28 rounded-lg mb-3 flex items-center justify-center"
            style={{
              background: "var(--color-paper)",
              border: "1px solid rgba(217, 195, 166, 0.5)",
            }}
          >
            <span className="text-3xl" style={{ opacity: 0.6 }}>
              🍽️
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "1rem",
              color: "var(--color-charcoal)",
              lineHeight: 1.3,
            }}
          >
            {recipe.title}
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-stone)",
              fontStyle: "italic",
              marginBottom: "0.5rem",
            }}
          >
            {recipe.source}
          </p>
          <Link
            to={`/recipe/${recipe.id}`}
            className="view-all-link"
            style={{ fontSize: "0.85rem" }}
          >
            View recipe →
          </Link>
        </div>
      ) : (
        <div
          className="flex-grow flex flex-col items-center justify-center"
          style={{ color: "var(--color-stone)", minHeight: "140px", opacity: 0.7 }}
        >
          <p style={{ fontStyle: "italic" }}>No meal planned</p>
        </div>
      )}
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={onChoose} className="meal-card-button">
          {recipe ? "Change meal" : "Choose meal"}
        </button>
        <button onClick={onSuggest} className="meal-card-button">
          Suggest a meal
        </button>
        {recipe && (
          <button
            onClick={onClear}
            className="meal-card-button"
            style={{
              background: "transparent",
              border: "1px solid var(--color-wood-dark)",
              color: "var(--color-stone)",
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
