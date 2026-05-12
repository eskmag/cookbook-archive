export type Cookbook = {
    id: number;
    title: string;
    author: string;
    description?: string;
    location?: string;
    favoriteRecipes: string[];
    isFavorite: boolean;
};

export const cookbooks: Cookbook[] = [
    {
        id: 1,
        title: "The Joy of Cooking",
        author: "Irma S. Rombauer",
        description: "A classic cookbook that has been a staple in American kitchens since 1931.",
        location: "Kitchen Shelf",
        favoriteRecipes: ["Beef Stroganoff", "Chocolate Cake", "Apple Pie"],
        isFavorite: true,
    },
    {
        id: 2,
        title: "Mastering the Art of French Cooking",
        author: "Julia Child, Louisette Bertholle, Simone Beck",
        description: "An essential guide to French cuisine, filled with detailed recipes and techniques.",
        location: "Cookbook Collection",
        favoriteRecipes: ["Coq au Vin", "Boeuf Bourguignon", "Ratatouille"],
        isFavorite: false,
    },
    {
        id: 3,
        title: "Salt, Fat, Acid, Heat",
        author: "Samin Nosrat",
        description: "A modern guide to the four fundamental elements of good cooking.",
        location: "Kitchen Shelf",
        favoriteRecipes: ["Buttermilk Roast Chicken", "Persian-ish Rice"],
        isFavorite: true,
    },
];
