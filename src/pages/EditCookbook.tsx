import { useParams, useNavigate } from "react-router-dom";
import { useCookbook } from "../context/CookbookContext";
import React, { useState, useEffect } from "react";
import type { Cookbook } from "../data/cookbook";

export default function EditCookbook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cookbooks, updateCookbook } = useCookbook();

  const bookId = Number(id);
  const bookToEdit = cookbooks.find((b) => b.id === bookId);

  const [form, setForm] = useState<Omit<Cookbook, "id">>({
    title: "",
    author: "",
    description: "",
    location: "",
    isFavorite: false,
    favoriteRecipes: [],
  });

  useEffect(() => {
    if (bookToEdit) {
      const { id: _id, ...rest } = bookToEdit;
      setForm({ ...rest, favoriteRecipes: rest.favoriteRecipes ?? [] });
    }
  }, [bookToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecipeChange = (index: number, value: string) => {
    const updated = [...(form.favoriteRecipes ?? [])];
    updated[index] = value;
    setForm((prev) => ({ ...prev, favoriteRecipes: updated }));
  };

  const handleAddRecipe = () => {
    setForm((prev) => ({
      ...prev,
      favoriteRecipes: [...(prev.favoriteRecipes ?? []), ""],
    }));
  };

  const handleRemoveRecipe = (index: number) => {
    const updated = [...(form.favoriteRecipes ?? [])];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, favoriteRecipes: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookToEdit) return;

    await updateCookbook({
      ...bookToEdit,
      ...form,
    });

    navigate(`/cookbook/${bookId}`);
  };

  if (!bookToEdit) {
    return (
      <div className="form-card max-w-xl mx-auto text-center">
        <p style={{ color: "var(--color-rose-dark)" }}>Can't find that cookbook.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="section-title">Edit Cookbook</h1>
      <form onSubmit={handleSubmit} className="form-card space-y-4">
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="form-label">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="form-label">Favorite recipes</label>
          {form.favoriteRecipes?.map((recipe, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={recipe}
                onChange={(e) => handleRecipeChange(index, e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => handleRemoveRecipe(index)}
                className="btn-secondary"
                style={{ padding: "0.5rem 0.75rem" }}
                aria-label="Remove recipe"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRecipe}
            className="view-all-link"
            style={{ marginTop: "0.75rem", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            + Add recipe
          </button>
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-input"
            rows={3}
          />
        </div>

        <div>
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
