import { Link } from "react-router-dom";
import { useCookbook } from "../context/CookbookContext";
import { useRecipe } from "../context/RecipeContext";

export default function AboutDemo() {
  const { cookbooks } = useCookbook();
  const { recipes } = useRecipe();

  const stats = {
    totalCookbooks: cookbooks.length,
    favoriteCookbooks: cookbooks.filter((b) => b.isFavorite).length,
    totalRecipes: recipes.length,
    favoriteRecipes: recipes.filter((r) => r.isFavorite).length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-initials">📚</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-display">
              <h2 className="profile-name">My Kitchen Shelf</h2>
              <p className="profile-email">A portfolio demo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h3 className="section-title">About this project</h3>
        <p style={{ lineHeight: 1.7 }}>
          My Kitchen Shelf is a personal cookbook and recipe archive I built to keep track of
          where my favorite recipes live across the cookbooks on my shelf. This is a public
          demo — there's no account, no login, and no backend. All data lives in memory and
          resets the moment you reload the page, so feel free to add, edit, favorite, and
          delete anything.
        </p>
        <p style={{ marginTop: "1rem", lineHeight: 1.7 }}>
          Built with React, TypeScript, Vite, Tailwind, and React Router. The full source
          lives on GitHub.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="https://github.com/eskmag/cookbook-archive"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            View on GitHub
          </a>
          <Link to="/" className="btn-secondary">
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="profile-card">
        <h3 className="section-title">What's in the demo right now</h3>
        <div className="stats-overview" style={{ marginTop: "1rem" }}>
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
              <div className="stat-number">
                {stats.favoriteCookbooks + stats.favoriteRecipes}
              </div>
              <div className="stat-label">Favorites</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h3 className="section-title">Things to try</h3>
        <ul style={{ lineHeight: 1.9, paddingLeft: "1.25rem", listStyle: "disc" }}>
          <li>Add a new cookbook or recipe from the relevant page.</li>
          <li>Mark items as favorites and check the Favorites page.</li>
          <li>Open the Meal Planner and let it suggest a meal for each day.</li>
          <li>Reload the page — everything resets to the seeded demo data.</li>
        </ul>
      </div>
    </div>
  );
}
