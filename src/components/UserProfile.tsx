import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCookbook } from "../context/CookbookContext";
import { useRecipe } from "../context/RecipeContext";
import { supabase } from "../supabase";

export default function UserProfile() {
  const { user, logout, refreshUser } = useAuth();
  const { cookbooks } = useCookbook();
  const { recipes } = useRecipe();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: editName.trim() }
      });

      if (error) {
        setError(error.message);
      } else {
        await refreshUser(); // Refresh user data
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(user.name || "");
    setIsEditing(false);
    setError("");
  };

  const userStats = {
    totalCookbooks: cookbooks.length,
    favoriteCookbooks: cookbooks.filter(book => book.isFavorite).length,
    totalRecipes: recipes.length,
    favoriteRecipes: recipes.filter(recipe => recipe.isFavorite).length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-initials">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="edit-profile-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="profile-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" disabled={saving} className="btn-save">
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="btn-cancel">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-display">
                <h2 className="profile-name">{user.name || "Anonymous User"}</h2>
                <p className="profile-email">{user.email}</p>
                <button onClick={() => setIsEditing(true)} className="btn-edit">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{userStats.totalCookbooks}</h3>
            <p className="stat-label">Total Cookbooks</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <h3 className="stat-number">{userStats.favoriteCookbooks}</h3>
            <p className="stat-label">Favorite Cookbooks</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3 className="stat-number">{userStats.totalRecipes}</h3>
            <p className="stat-label">Total Recipes</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{userStats.favoriteRecipes}</h3>
            <p className="stat-label">Favorite Recipes</p>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="profile-card">
        <h3 className="section-title">Account Management</h3>
        <div className="account-actions">
          <div className="account-info">
            <h4>Account Details</h4>
            <p className="account-description">
              Your account was created and is managed through Supabase authentication.
            </p>
          </div>
          
          <div className="danger-zone">
            <h4 className="danger-title">Danger Zone</h4>
            <p className="danger-description">
              Signing out will require you to log in again to access your recipes and cookbooks.
            </p>
            <button onClick={logout} className="btn-danger">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
