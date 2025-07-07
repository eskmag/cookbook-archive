// App.tsx
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen px-4 py-8">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            {user && (
              <Link 
                to="/profile" 
                className="profile-link"
              >
                View Profile
              </Link>
            )}
          </div>
          
          <div className="header-right">
            {user ? (
              <>
                <span className="welcome-text">
                  Welcome, {user.name || user.email}!
                </span>
                <button
                  onClick={logout}
                  className="logout-button"
                >
                  Log out
                </button>
              </>
            ) : (
              <span className="not-logged-in-text">Not logged in</span>
            )}
          </div>
        </div>
      </header>
      <h1 className="app-title">
        📚 Cookbook Archive
      </h1>
      <nav className="main-navigation">
        {user ? (
          <>
            <Link to="/" className="nav-link">
              🏠 Home
            </Link>
            <Link to="/favorites" className="nav-link">
              ❤️ Favorites
            </Link>
            <Link to="/cookbooks" className="nav-link">
              📖 Cookbooks
            </Link>
            <Link to="/recipes" className="nav-link">
              🍳 Recipes
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              🔑 Log In
            </Link>
            <Link to="/register" className="nav-link">
              📝 Register
            </Link>
          </>
        )}
      </nav>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
