import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookbook } from "../context/CookbookContext";
import type { Cookbook } from "../context/CookbookContext";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>(); // alltid string fra URL
  const navigate = useNavigate();
  const { cookbooks, deleteCookbook } = useCookbook();

  // Konverterer id fra string til number (hvis id finnes)
  const idNum = id ? parseInt(id, 10) : undefined;

  const [book, setBook] = useState<Cookbook | undefined>(undefined);

  useEffect(() => {
    if (idNum === undefined || isNaN(idNum)) {
      setBook(undefined);
      return;
    }
    const found = cookbooks.find((b) => b.id === idNum);
    setBook(found);
  }, [idNum, cookbooks]);

  if (!id || idNum === undefined || isNaN(idNum)) {
    return <div className="p-6 text-red-600">Invalid cookbook ID</div>;
  }

  if (!book) {
    return <div className="p-6 text-gray-500">Loading cookbook...</div>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this cookbook?");
    if (confirmed) {
      await deleteCookbook(book.id);
      navigate("/");
    }
  };

  return (
    <div className="book-detail max-w-2xl mx-auto p-6">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-700 italic mb-2">by {book.author}</p>

      {book.description && <p className="mb-2">{book.description}</p>}
      {book.location && <p className="mb-2 text-sm text-gray-500">📍 {book.location}</p>}

      {book.favoriteRecipes?.length ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Favorite Recipes</h2>
          <ul className="list-disc list-inside">
            {book.favoriteRecipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No favorites yet</p>
      )}

      <div className="mt-6 flex gap-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/cookbook/${book.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
