import { Link } from "react-router-dom";
import type { Recipe } from "../context/RecipeContext";
import { useRecipe } from "../context/RecipeContext";

type Props = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
    const { toggleFavorite } = useRecipe();
    
    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        toggleFavorite(recipe.id);
    };

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
                <h2 className="recipe-card-title">{recipe.title}</h2>
                <p className="recipe-card-source">from {recipe.source}</p>
            </Link>
            <button
                onClick={handleToggle}
                className="recipe-card-favorite-btn"
                title="Favorite"
            >
                {recipe.isFavorite ? "❤️" : "🤍"}
            </button>
        </div>
    );
}