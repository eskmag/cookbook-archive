import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthContext";

export type Cookbook = {
  id: number;          // number, ikke string
  user_id: string;
  title: string;
  author: string;
  description?: string;
  location?: string;
  isFavorite: boolean;
  favoriteRecipes: string[];
};

export type CookbookInput = Omit<Cookbook, "id" | "user_id">;

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
  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCookbooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cookbooks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching cookbooks:", error);
      } else {
        // Make sure IDs are numbers
        setCookbooks(
          (data || []).map((item) => ({
            ...item,
            id: typeof item.id === "string" ? parseInt(item.id, 10) : item.id,
            isFavorite: item.isFavorite || false, // Use the correct database column name
          }))
        );
      }
      setLoading(false);
    };

    fetchCookbooks();
  }, [user]);

  const addCookbook = async (book: CookbookInput) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("cookbooks")
      .insert([{ ...book, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error saving cookbook:", error);
    } else {
      setCookbooks((prev) => [
        {
          ...data,
          id: typeof data.id === "string" ? parseInt(data.id, 10) : data.id,
          isFavorite: data.isFavorite || false, // Use the correct database column name
        },
        ...prev,
      ]);
    }
  };

  const updateCookbook = async (updated: Cookbook) => {
    const { id, ...data } = updated;

    const { error, data: updatedData } = await supabase
        .from("cookbooks")
        .update({
        ...data,
        isFavorite: updated.isFavorite, // Use the correct database column name
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating cookbook:", error);
    } else {
        setCookbooks((prev) =>
        prev.map((book) => (book.id === id ? {
            ...updatedData,
            id: typeof updatedData.id === "string" ? parseInt(updatedData.id, 10) : updatedData.id,
            isFavorite: updatedData.isFavorite || false, // Use the correct database column name
        } : book))
        );
    }
    };


  const deleteCookbook = async (id: number) => {
    const { error } = await supabase.from("cookbooks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting cookbook:", error);
    } else {
      setCookbooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const toggleFavorite = async (id: number) => {
    const book = cookbooks.find((b) => b.id === id);
    if (!book) return;

    const updated = !book.isFavorite;

    const { error } = await supabase
      .from("cookbooks")
      .update({ isFavorite: updated })
      .eq("id", id);

    if (error) {
      console.error("Error updating favorite:", error);
    } else {
      setCookbooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isFavorite: updated } : b))
      );
    }
  };

  return (
    <CookbookContext.Provider
      value={{ cookbooks, loading, addCookbook, updateCookbook, deleteCookbook, toggleFavorite }}
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
