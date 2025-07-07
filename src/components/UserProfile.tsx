import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCookbook } from "../context/CookbookContext";
import { useRecipe } from "../context/RecipeContext";
import { supabase } from "../supabase";
import toast from 'react-hot-toast';

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
        toast.error("Failed to update profile: " + error.message);
      } else {
        await refreshUser(); // Refresh user data
        toast.success("Profile updated successfully! 🎉");
        setIsEditing(false);
      }
    } catch (err) {
      setError("Failed to update profile");
      toast.error("Failed to update profile");
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

      {/* Personal Cooking Goals */}
      <div className="profile-card">
        <h3 className="section-title">Your Cooking Journey</h3>
        <div className="cooking-goals-section">
          <div className="goal-item">
            <div className="goal-icon">🎯</div>
            <div className="goal-content">
              <h4>Collection Goal</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((userStats.totalCookbooks / 10) * 100, 100)}%` }}
                ></div>
              </div>
              <p>{userStats.totalCookbooks}/10 cookbooks collected</p>
            </div>
          </div>
          
          <div className="goal-item">
            <div className="goal-icon">👨‍🍳</div>
            <div className="goal-content">
              <h4>Recipe Master</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((userStats.totalRecipes / 25) * 100, 100)}%` }}
                ></div>
              </div>
              <p>{userStats.totalRecipes}/25 recipes created</p>
            </div>
          </div>
          
          <div className="goal-item">
            <div className="goal-icon">⭐</div>
            <div className="goal-content">
              <h4>Favorite Hunter</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(((userStats.favoriteCookbooks + userStats.favoriteRecipes) / 15) * 100, 100)}%` }}
                ></div>
              </div>
              <p>{userStats.favoriteCookbooks + userStats.favoriteRecipes}/15 favorites marked</p>
            </div>
          </div>
        </div>
        
        <div className="achievement-badges">
          <h4>Achievements</h4>
          <div className="badges-grid">
            <div className={`badge ${userStats.totalCookbooks >= 1 ? 'earned' : 'locked'}`}>
              <span className="badge-icon">📚</span>
              <span className="badge-name">First Collection</span>
            </div>
            <div className={`badge ${userStats.totalRecipes >= 5 ? 'earned' : 'locked'}`}>
              <span className="badge-icon">🍳</span>
              <span className="badge-name">Recipe Creator</span>
            </div>
            <div className={`badge ${(userStats.favoriteCookbooks + userStats.favoriteRecipes) >= 10 ? 'earned' : 'locked'}`}>
              <span className="badge-icon">❤️</span>
              <span className="badge-name">Favorite Lover</span>
            </div>
            <div className={`badge ${userStats.totalCookbooks >= 5 && userStats.totalRecipes >= 10 ? 'earned' : 'locked'}`}>
              <span className="badge-icon">🏆</span>
              <span className="badge-name">Kitchen Master</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="profile-card">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-section">
          <div className="activity-item">
            <div className="activity-icon">📖</div>
            <div className="activity-content">
              <p><strong>Last cookbook added:</strong> {userStats.totalCookbooks > 0 ? 'Recently' : 'None yet'}</p>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">🍽️</div>
            <div className="activity-content">
              <p><strong>Last recipe added:</strong> {userStats.totalRecipes > 0 ? 'Recently' : 'None yet'}</p>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p><strong>Total favorites:</strong> {userStats.favoriteCookbooks + userStats.favoriteRecipes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="profile-card">
        <h3 className="section-title">Preferences (coming soon)</h3>
        <div className="preferences-section">
          <div className="preference-item">
            <label className="preference-label">
              <input type="checkbox" className="preference-checkbox" />
              <span>Email notifications for new features</span>
            </label>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input type="checkbox" className="preference-checkbox" defaultChecked />
              <span>Show cooking tips and suggestions</span>
            </label>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input type="checkbox" className="preference-checkbox" />
              <span>Dark mode</span>
            </label>
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
