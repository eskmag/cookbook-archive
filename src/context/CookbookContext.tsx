import React, { createContext, useContext, useRef, useState } from "react";
import { cookbooks as seedCookbooks } from "../data/cookbook";

export type Cookbook = {
  id: number;
  title: string;
  author: string;
  description?: string;
  location?: string;
  isFavorite: boolean;
  favoriteRecipes: string[];
};

export type CookbookInput = Omit<Cookbook, "id">;

type CookbookContextType = {
  cookbooks: Cookbook[];
  loading: boolean;
  addCookbook: (book: CookbookInput) => Promise<void>;
  deleteCookbook: (id: number) => Promise<void>;
  updateCookbook: (book: Cookbook) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
};

const CookbookContext = createContext<CookbookContextType | undefined>(undefined);

export const CookbookProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookbooks, setCookbooks] = useState<Cookbook[]>(seedCookbooks);
  const nextId = useRef(
    seedCookbooks.reduce((max, b) => Math.max(max, b.id), 0) + 1
  );

  const addCookbook = async (book: CookbookInput) => {
    setCookbooks((prev) => [{ ...book, id: nextId.current++ }, ...prev]);
  };

  const updateCookbook = async (updated: Cookbook) => {
    setCookbooks((prev) =>
      prev.map((book) => (book.id === updated.id ? updated : book))
    );
  };

  const deleteCookbook = async (id: number) => {
    setCookbooks((prev) => prev.filter((book) => book.id !== id));
  };

  const toggleFavorite = async (id: number) => {
    setCookbooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  return (
    <CookbookContext.Provider
      value={{
        cookbooks,
        loading: false,
        addCookbook,
        updateCookbook,
        deleteCookbook,
        toggleFavorite,
      }}
    >
      {children}
    </CookbookContext.Provider>
  );
};

export const useCookbook = () => {
  const context = useContext(CookbookContext);
  if (!context) {
    throw new Error("useCookbook must be used within a CookbookProvider");
  }
  return context;
};
