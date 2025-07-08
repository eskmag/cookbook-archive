// App.tsx
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";

export default function App() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Mobile menu overlay - blocks content when menu is open */}
      <div 
        className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>
      
      <h1 className="app-title">
        My Kitchen Shelf
      </h1>

      <header className="app-header">
        <div className="header-content">
          <div className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <nav className={`header-nav ${menuOpen ? 'mobile-open' : ''}`}>
            {user ? (
              <>
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
                <Link to="/profile" className="nav-link nav-link-subtle" onClick={() => setMenuOpen(false)}>
                  👤 Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  🔑 Log In
                </Link>
                <Link to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>
                  📝 Register
                </Link>
              </>
            )}
          </nav>
          
          <div className="header-right">
            {user ? (
              <span className="welcome-text">
                Welcome, {user.name || user.email}!
              </span>
            ) : (
              <span className="not-logged-in-text">Not logged in</span>
            )}
          </div>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
