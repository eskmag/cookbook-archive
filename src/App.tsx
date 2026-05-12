// App.tsx
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-full overflow-hidden">
      {/* Mobile menu overlay - blocks content when menu is open */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>

      <h1 className="app-title">My Kitchen Shelf</h1>

      <header className="app-header">
        <div className="header-content">
          <div className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <div className={`hamburger ${menuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <nav className={`header-nav ${menuOpen ? "mobile-open" : ""}`}>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              🏠 Home
            </Link>
            <Link to="/favorites" className="nav-link" onClick={() => setMenuOpen(false)}>
              ❤️ Favorites
            </Link>
            <Link to="/cookbooks" className="nav-link" onClick={() => setMenuOpen(false)}>
              📖 Cookbooks
            </Link>
            <Link to="/recipes" className="nav-link" onClick={() => setMenuOpen(false)}>
              🍳 Recipes
            </Link>
            <Link to="/meal-planner" className="nav-link" onClick={() => setMenuOpen(false)}>
              📅 Meal Planner
            </Link>
            <Link to="/about" className="nav-link nav-link-subtle" onClick={() => setMenuOpen(false)}>
              ℹ️ About
            </Link>
          </nav>

          <div className="header-right">
            <span className="welcome-text">Demo mode — data resets on reload</span>
          </div>
        </div>
      </header>

      <main className="page-container max-w-full w-full overflow-x-hidden">
        <div className="content-wrapper max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
