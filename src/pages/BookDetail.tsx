import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookbook } from "../context/CookbookContext";
import type { Cookbook } from "../context/CookbookContext";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cookbooks, deleteCookbook } = useCookbook();

  const idNum = id ? parseInt(id, 10) : undefined;
  const [book, setBook] = useState<Cookbook | undefined>(undefined);

  useEffect(() => {
    if (idNum === undefined || isNaN(idNum)) {
      setBook(undefined);
      return;
    }
    setBook(cookbooks.find((b) => b.id === idNum));
  }, [idNum, cookbooks]);

  if (!id || idNum === undefined || isNaN(idNum)) {
    return (
      <div className="book-detail max-w-2xl mx-auto text-center">
        <p style={{ color: "var(--color-rose-dark)" }}>Invalid cookbook ID</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail max-w-2xl mx-auto text-center">
        <p style={{ color: "var(--color-stone)" }}>Loading cookbook…</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this cookbook?");
    if (confirmed) {
      await deleteCookbook(book.id);
      navigate("/");
    }
  };

  return (
    <div className="book-detail max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/cookbooks")}
        className="view-all-link"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: "1.25rem",
          display: "inline-block",
        }}
      >
        ← Back
      </button>

      <h1>{book.title}</h1>
      <p style={{ color: "var(--color-stone)", fontStyle: "italic", marginTop: "0.25rem" }}>
        by {book.author}
      </p>

      {book.description && (
        <p style={{ marginTop: "1rem", lineHeight: 1.7 }}>{book.description}</p>
      )}
      {book.location && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "var(--color-stone)" }}>
          📍 {book.location}
        </p>
      )}

      {book.favoriteRecipes?.length ? (
        <div style={{ marginTop: "1.75rem" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Favorite Recipes</h2>
          <ul className="list-disc list-inside" style={{ color: "var(--color-charcoal)", lineHeight: 1.8 }}>
            {book.favoriteRecipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ marginTop: "1.5rem", color: "var(--color-stone)", fontStyle: "italic" }}>
          No favorites yet
        </p>
      )}

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          className="edit-button"
          onClick={() => navigate(`/cookbook/${book.id}/edit`)}
        >
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
