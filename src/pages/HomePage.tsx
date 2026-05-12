import { Link } from "react-router-dom";
import { useCookbook } from "../context/CookbookContext";
import { useRecipe } from "../context/RecipeContext";
import CookbookCard from "../components/CookbookCard";
import RecipeCard from "../components/RecipeCard";

export default function HomePage() {
  const { cookbooks } = useCookbook();
  const { recipes } = useRecipe();

  // Get recent items (last 4)
  const recentCookbooks = cookbooks.slice(-4).reverse();
  const recentRecipes = recipes.slice(-4).reverse();
  
  // Get favorite items (max 4)
  const favoriteCookbooks = cookbooks.filter(book => book.isFavorite).slice(0, 4);
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite).slice(0, 4);

  const stats = {
    totalCookbooks: cookbooks.length,
    totalRecipes: recipes.length,
    favoriteCookbooks: favoriteCookbooks.length,
    favoriteRecipes: favoriteRecipes.length,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to My Kitchen Shelf 👋
          </h1>
          <p className="hero-subtitle">
            A portfolio demo of a personal cookbook and recipe archive. Add, edit, favorite —
            everything resets on reload.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalCookbooks}</div>
            <div className="stat-label">Cookbooks</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🍳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalRecipes}</div>
            <div className="stat-label">Recipes</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.favoriteCookbooks + stats.favoriteRecipes}</div>
            <div className="stat-label">Favorites</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-grid">
          <Link to="/cookbooks" className="action-card">
            <div className="action-icon">📖</div>
            <h3>Browse Cookbooks</h3>
            <p>Explore your cookbook collection</p>
          </Link>
          <Link to="/recipes" className="action-card">
            <div className="action-icon">🍴</div>
            <h3>View Recipes</h3>
            <p>Discover delicious recipes</p>
          </Link>
          <Link to="/favorites" className="action-card">
            <div className="action-icon">⭐</div>
            <h3>Your Favorites</h3>
            <p>Quick access to loved items</p>
          </Link>
          <Link to="/about" className="action-card">
            <div className="action-icon">ℹ️</div>
            <h3>About</h3>
            <p>About this demo</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {(recentCookbooks.length > 0 || recentRecipes.length > 0) && (
        <div className="recent-section">
          <h2 className="section-title">Recently Added</h2>
          
          {recentCookbooks.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h3 className="subsection-title">Latest Cookbooks</h3>
                <Link to="/cookbooks" className="view-all-link">View All →</Link>
              </div>
              <div className="content-grid">
                {recentCookbooks.map((book) => (
                  <CookbookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}

          {recentRecipes.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h3 className="subsection-title">Latest Recipes</h3>
                <Link to="/recipes" className="view-all-link">View All →</Link>
              </div>
              <div className="content-grid">
                {recentRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Favorites Section */}
      {(favoriteCookbooks.length > 0 || favoriteRecipes.length > 0) && (
        <div className="favorites-section">
          <h2 className="section-title">Your Favorites ❤️</h2>
          
          {favoriteCookbooks.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h3 className="subsection-title">Favorite Cookbooks</h3>
                <Link to="/favorites" className="view-all-link">View All →</Link>
              </div>
              <div className="content-grid">
                {favoriteCookbooks.map((book) => (
                  <CookbookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}

          {favoriteRecipes.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h3 className="subsection-title">Favorite Recipes</h3>
                <Link to="/favorites" className="view-all-link">View All →</Link>
              </div>
              <div className="content-grid">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {cookbooks.length === 0 && recipes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚✨</div>
          <h2 className="empty-title">Welcome to Your Cookbook Archive!</h2>
          <p className="empty-description">
            You're just getting started! Add your first cookbook or recipe to begin organizing your culinary journey.
          </p>
          <div className="empty-actions">
            <Link to="/cookbooks" className="btn-primary">
              Add Your First Cookbook
            </Link>
            <Link to="/recipes" className="btn-secondary">
              Add Your First Recipe
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
