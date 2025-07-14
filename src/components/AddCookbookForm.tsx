import { useState } from "react";
import type { CookbookInput } from "../context/CookbookContext";
import toast from 'react-hot-toast';
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

      // Reset
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      {/* ISBN and Barcode Scanner Section */}
      <div className="space-y-3">
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <div className="flex-1">
            <div className="flex">
              <input
                className="w-full border rounded-l px-3 py-2"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ISBN"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => isbn && lookupBookByISBN(isbn)}
                disabled={!isbn || isLoading}
                className="bg-amber-600 text-white px-3 py-2 rounded-r disabled:bg-gray-300"
              >
                {isLoading ? "Loading..." : "Lookup"}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsScanning(!isScanning)}
            className={`px-3 py-2 rounded flex items-center justify-center ${
              isScanning ? "bg-red-500 text-white" : "bg-green-600 text-white"
            }`}
          >
            {isScanning ? "Stop Scan" : "Scan Barcode"}
          </button>
        </div>
        
        {isScanning && (
          <div className="mt-4">
            <BarcodeScanner onDetected={handleBarcodeDetected} isScanning={isScanning} />
          </div>
        )}
      </div>
      
      {/* Main Cookbook Form Fields */}
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

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        disabled={isLoading}
      >
        Add Cookbook
      </button>
    </form>
  );
}
