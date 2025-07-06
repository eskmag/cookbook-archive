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
        📚 My Shelf
      </h1>
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 max-w-6xl mx-auto">
        {user ? (
          <>
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-2 py-1">
              ❤️ Favorites
            </Link>
            <Link to="/cookbooks" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-2 py-1">
              📖 All Cookbooks
            </Link>
            <Link to="/recipes" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-2 py-1">
              📋 Recipes
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-2 py-1">
              Log In
            </Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-2 py-1">
              Register
            </Link>
          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}
