export interface Recipe {
    id: number;
    title: string;
    source: string;
    ingredients: string[];
    instructions: string;
    notes?: string;
    isFavorite: boolean;
}

export const recipes: Recipe[] = [
    {
        id: 1,
        title: "Beef Bourguignon",
        source: "Mastering the Art of French Cooking",
        ingredients: [
            "1.5 kg beef chuck, cubed",
            "200 g bacon lardons",
            "3 carrots, sliced",
            "2 onions, chopped",
            "3 cloves garlic, minced",
            "750 ml red Burgundy wine",
            "500 ml beef stock",
            "2 tbsp tomato paste",
            "1 bouquet garni",
            "Salt and pepper",
        ],
        instructions:
            "Brown the beef and bacon, then sauté the vegetables. Deglaze with wine, add stock and tomato paste, then braise covered at 160°C for 2.5 hours until tender. Finish with sautéed mushrooms and pearl onions.",
        notes: "Even better the next day.",
        isFavorite: true,
    },
    {
        id: 2,
        title: "Chocolate Chip Cookies",
        source: "The Joy of Cooking",
        ingredients: [
            "225 g butter, softened",
            "200 g brown sugar",
            "100 g white sugar",
            "2 eggs",
            "1 tsp vanilla extract",
            "320 g flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "300 g chocolate chips",
        ],
        instructions:
            "Cream butter and sugars. Beat in eggs and vanilla. Mix dry ingredients separately, then combine. Fold in chocolate chips. Drop spoonfuls onto a baking sheet and bake at 190°C for 10–12 minutes.",
        isFavorite: false,
    },
    {
        id: 3,
        title: "Pad Thai",
        source: "Personal recipe",
        ingredients: [
            "200 g rice noodles",
            "200 g shrimp or chicken",
            "2 eggs",
            "100 g bean sprouts",
            "3 spring onions, chopped",
            "50 g roasted peanuts, crushed",
            "3 tbsp tamarind paste",
            "3 tbsp fish sauce",
            "2 tbsp palm sugar",
            "1 lime, wedged",
        ],
        instructions:
            "Soak noodles until pliable. Stir-fry protein in a hot wok, push aside and scramble eggs. Add noodles and sauce (tamarind, fish sauce, sugar). Toss with sprouts and spring onions. Top with peanuts and lime.",
        notes: "Have everything prepped before you start — the cook is fast.",
        isFavorite: true,
    },
    {
        id: 4,
        title: "Caesar Salad",
        source: "Classic",
        ingredients: [
            "1 head romaine lettuce",
            "50 g parmesan, shaved",
            "100 g croutons",
            "2 anchovy fillets",
            "1 egg yolk",
            "1 clove garlic",
            "1 tsp Dijon mustard",
            "1 tbsp lemon juice",
            "100 ml olive oil",
        ],
        instructions:
            "Whisk yolk, mustard, anchovies, garlic, and lemon juice. Slowly stream in olive oil to emulsify. Toss with torn romaine, top with croutons and parmesan.",
        isFavorite: false,
    },
    {
        id: 5,
        title: "Ratatouille",
        source: "Mastering the Art of French Cooking",
        ingredients: [
            "1 aubergine, diced",
            "2 courgettes, sliced",
            "1 red pepper, chopped",
            "1 yellow pepper, chopped",
            "4 tomatoes, chopped",
            "1 onion, sliced",
            "3 cloves garlic, minced",
            "Fresh thyme and basil",
            "Olive oil, salt, pepper",
        ],
        instructions:
            "Sauté each vegetable separately in olive oil, then combine in a pot with garlic, herbs, and tomatoes. Simmer gently for 30 minutes until everything melds together.",
        isFavorite: false,
    },
    {
        id: 6,
        title: "Coq au Vin",
        source: "Mastering the Art of French Cooking",
        ingredients: [
            "1 whole chicken, jointed",
            "200 g bacon lardons",
            "200 g button mushrooms",
            "12 pearl onions",
            "750 ml red wine",
            "300 ml chicken stock",
            "2 tbsp flour",
            "2 tbsp butter",
            "1 bouquet garni",
        ],
        instructions:
            "Brown chicken and bacon. Flame with brandy if you like. Add wine, stock, and bouquet garni and simmer for 45 minutes. Sauté mushrooms and pearl onions, fold in, thicken sauce with beurre manié.",
        isFavorite: true,
    },
];
