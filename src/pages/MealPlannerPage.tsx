import { useState } from "react";
import toast from "react-hot-toast";
import MealCard from "../components/MealCard";
import { useRecipe } from "../context/RecipeContext";
import type { Recipe } from "../context/RecipeContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof daysOfWeek)[number];
type MealPlan = Record<Day, Recipe | null>;

const emptyPlan: MealPlan = {
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
  Sunday: null,
};

export default function MealPlannerPage() {
  const { recipes } = useRecipe();
  const [plan, setPlan] = useState<MealPlan>(emptyPlan);

  const pickRandom = (exclude?: Recipe | null): Recipe | null => {
    if (recipes.length === 0) return null;
    if (recipes.length === 1) return recipes[0];
    let pick = recipes[Math.floor(Math.random() * recipes.length)];
    while (exclude && pick.id === exclude.id) {
      pick = recipes[Math.floor(Math.random() * recipes.length)];
    }
    return pick;
  };

  const handleSuggest = (day: Day) => {
    const pick = pickRandom(plan[day]);
    if (!pick) {
      toast.error("No recipes to suggest yet. Add one first!");
      return;
    }
    setPlan((prev) => ({ ...prev, [day]: pick }));
    toast.success(`${pick.title} planned for ${day} 🍽️`);
  };

  const handleChoose = (day: Day) => {
    if (recipes.length === 0) {
      toast.error("No recipes available yet.");
      return;
    }
    const current = plan[day];
    const currentIdx = current ? recipes.findIndex((r) => r.id === current.id) : -1;
    const nextIdx = (currentIdx + 1) % recipes.length;
    setPlan((prev) => ({ ...prev, [day]: recipes[nextIdx] }));
  };

  const handleClear = (day: Day) => {
    setPlan((prev) => ({ ...prev, [day]: null }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 text-stone-700">Weekly Meal Planner</h2>
      <p className="text-stone-500 mb-6">
        Click <em>Suggest a Meal</em> for a random pick, or <em>Choose Meal</em> to cycle through
        your recipes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {daysOfWeek.map((day) => (
          <MealCard
            key={day}
            day={day}
            recipe={plan[day]}
            onSuggest={() => handleSuggest(day)}
            onChoose={() => handleChoose(day)}
            onClear={() => handleClear(day)}
          />
        ))}
      </div>
    </div>
  );
}
