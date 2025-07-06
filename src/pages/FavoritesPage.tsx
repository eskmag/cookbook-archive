import { useCookbook } from "../context/CookbookContext";
import CookbookCard from "../components/CookbookCard";
import { useRecipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { CookbookSkeleton, RecipeSkeleton } from "../components/SkeletonCard";

export default function FavoritesPage() {
  const { cookbooks, loading: cookbooksLoading } = useCookbook();
  const favoriteBooks = cookbooks.filter((book) => book.isFavorite);
  const { recipes, loading: recipesLoading } = useRecipe();
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div className="favorites-page">
      <h1 className="text-3xl font-bold text-center text-gray-800">❤️ My Favorites</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Favorittbøker */}
        <div>
          <h2 className="favorite-books">📚 Cookbooks</h2>
          {cookbooksLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <CookbookSkeleton key={index} />
              ))}
            </div>
          ) : favoriteBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {favoriteBooks.map((book) => (
                <CookbookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-gray-500">No favorite cookbooks yet</p>
            </div>
          )}
        </div>

        {/* Favorite Recipes */}
        <div>
          <h2 className="favorite-recipes">🍽️ Recipes</h2>
          {recipesLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <RecipeSkeleton key={index} />
              ))}
            </div>
          ) : favoriteRecipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-gray-500">No favorite recipes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
