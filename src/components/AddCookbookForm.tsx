import { useState } from "react";
import type { CookbookInput } from "../context/CookbookContext";
import toast from "react-hot-toast";
import BarcodeScanner from "./BarcodeScanner";
import { fetchBookByISBN } from "../services/bookService";

type Props = {
  onAdd: (book: CookbookInput) => Promise<void>;
};

export default function AddCookbookForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      setTitle("");
      setAuthor("");
      setDescription("");
      setLocation("");
      setFavoriteRecipes("");
      setIsbn("");
    } catch (error) {
      toast.error("Failed to add cookbook");
    }
  };

  const handleBarcodeDetected = (code: string) => {
    setIsScanning(false);
    setIsbn(code);
    lookupBookByISBN(code);
  };

  const lookupBookByISBN = async (code: string) => {
    setIsLoading(true);
    try {
      const bookData = await fetchBookByISBN(code);

      if (bookData) {
        setTitle(bookData.title);
        setAuthor(bookData.author);
        if (bookData.description) {
          setDescription(bookData.description);
        }
        toast.success("Book information found! 📚");
      } else {
        toast.error("No book found with that ISBN");
      }
    } catch (error) {
      console.error("Error looking up ISBN:", error);
      toast.error("Failed to lookup book information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card space-y-4 max-w-2xl mx-auto">
      {/* ISBN + barcode scanner */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <div className="flex flex-1 gap-2">
            <input
              className="form-input"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => isbn && lookupBookByISBN(isbn)}
              disabled={!isbn || isLoading}
              className="btn-secondary whitespace-nowrap"
            >
              {isLoading ? "Looking up…" : "Lookup"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsScanning(!isScanning)}
            className="btn-secondary whitespace-nowrap"
          >
            {isScanning ? "Stop scan" : "Scan barcode"}
          </button>
        </div>

        {isScanning && (
          <div className="mt-2">
            <BarcodeScanner onDetected={handleBarcodeDetected} isScanning={isScanning} />
          </div>
        )}
      </div>

      <input
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Cookbook title"
        required
      />
      <input
        className="form-input"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <textarea
        className="form-input"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        className="form-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Where it lives (Kitchen shelf, etc.)"
      />
      <textarea
        className="form-input"
        rows={4}
        value={favoriteRecipes}
        onChange={(e) => setFavoriteRecipes(e.target.value)}
        placeholder="Favorite recipes (one per line)"
      />

      <button type="submit" className="btn-primary" disabled={isLoading}>
        Add Cookbook
      </button>
    </form>
  );
}
