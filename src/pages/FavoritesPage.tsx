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
    <div className="favorites-page w-full overflow-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">❤️ My Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Favorite Cookbooks */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 px-2">📚 Cookbooks</h2>
          {cookbooksLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <CookbookSkeleton key={index} />
              ))}
            </div>
          ) : favoriteBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteBooks.map((book) => (
                <CookbookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/50 rounded-lg shadow-sm">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-gray-500">No favorite cookbooks yet</p>
            </div>
          )}
        </div>

        {/* Favorite Recipes */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 px-2">🍽️ Recipes</h2>
          {recipesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <RecipeSkeleton key={index} />
              ))}
            </div>
          ) : favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/50 rounded-lg shadow-sm">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-gray-500">No favorite recipes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
