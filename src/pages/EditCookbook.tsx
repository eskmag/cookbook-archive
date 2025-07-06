import { useParams, useNavigate } from "react-router-dom";
import { useCookbook } from "../context/CookbookContext";
import React, { useState, useEffect } from "react";
import type { Cookbook } from "../data/cookbook";

export default function EditCookbook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cookbooks, updateCookbook } = useCookbook(); // 👈 Endret

  const bookId = Number(id);
  const bookToEdit = cookbooks.find((b) => b.id === bookId);

  const [form, setForm] = useState<Omit<Cookbook, "id" | "user_id">>({
    title: "",
    author: "",
    description: "",
    location: "",
    isFavorite: false,
    favoriteRecipes: [],
  });

  useEffect(() => {
    if (bookToEdit) {
      const { id, user_id, ...rest } = bookToEdit;
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
    return <div className="p-6 text-red-600">Can't find cookbook</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Cookbook</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Favorite recipes</label>
          {form.favoriteRecipes?.map((recipe, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={recipe}
                onChange={(e) => handleRecipeChange(index, e.target.value)}
                className="flex-1 border-gray-300 rounded-md shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveRecipe(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRecipe}
            className="mt-2 text-blue-600 hover:underline"
          >
            ➕ Add Recipe
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}