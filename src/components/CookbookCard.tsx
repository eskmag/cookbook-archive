import { Link } from "react-router-dom";
import { useCookbook } from "../context/CookbookContext";
import type { Cookbook } from "../context/CookbookContext";
import toast from 'react-hot-toast';

type Props = {
  book: Cookbook;
};

export default function CookbookCard({ book }: Props) {
  const { toggleFavorite } = useCookbook();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    toggleFavorite(book.id);
    
    if (book.isFavorite) {
      toast("Removed from favorites", {
        icon: "💔",
        duration: 2000,
      });
    } else {
      toast.success("Added to favorites! 📚", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="cookbook-card">
      <Link to={`/cookbook/${book.id}`} className="cookbook-card-link">
        <h2 className="cookbook-card-title">{book.title}</h2>
        <p className="cookbook-card-author">by {book.author}</p>
      </Link>
      <button
        onClick={handleToggle}
        className="cookbook-card-favorite-btn"
        title="Favorite"
      >
        {book.isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
