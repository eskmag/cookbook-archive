export interface Recipe {
    id: number;
    title: string;
    source: string;
    ingredients: string[];
    instructions: string;
    notes?: string;
    isFavorite?: boolean;
}