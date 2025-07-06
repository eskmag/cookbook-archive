import { useCookbook } from "../context/CookbookContext";
import AddCookbookForm from "../components/AddCookbookForm";
import CookbookCard from "../components/CookbookCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useState } from "react";

export default function AllCookbooksPage() {
  const { cookbooks, addCookbook, loading } = useCookbook();
  const [search, setSearch] = useState("");

  const filtered = cookbooks.filter((book) => {
    const q = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">📚 All Cookbooks</h1>

      <AddCookbookForm onAdd={addCookbook} />

      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search in cookbooks..."
          className="w-full max-w-sm px-4 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {loading ? (
          <SkeletonGrid count={6} type="cookbook" />
        ) : filtered.length > 0 ? (
          filtered.map((book) => <CookbookCard key={book.id} book={book} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No cookbooks yet</h3>
            <p className="text-gray-500 mb-4">Start building your cookbook collection</p>
          </div>
        )}
      </div>
    </div>
  );
}
