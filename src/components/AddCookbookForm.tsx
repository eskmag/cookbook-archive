import { useState } from "react";
import type { CookbookInput } from "../context/CookbookContext";
import toast from 'react-hot-toast';

type Props = {
  onAdd: (book: CookbookInput) => Promise<void>;
};

export default function AddCookbookForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newCookbook: CookbookInput = {
      title,
      author,
      description,
      location,
      favoriteRecipes: favoriteRecipes
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      isFavorite: false,
    };

    try {
      await onAdd(newCookbook);
      toast.success("Cookbook added successfully! 📚", {
        duration: 3000,
      });

      // Reset
      setTitle("");
      setAuthor("");
      setDescription("");
      setLocation("");
      setFavoriteRecipes("");
    } catch (error) {
      toast.error("Failed to add cookbook");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      <input
        className="w-full border rounded px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Cookbook Title"
        required
      />
      <input
        className="w-full border rounded px-3 py-2"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        className="w-full border rounded px-3 py-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={4}
        value={favoriteRecipes}
        onChange={(e) => setFavoriteRecipes(e.target.value)}
        placeholder="Favorite Recipes (one per line)"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Cookbook
      </button>
    </form>
  );
}
