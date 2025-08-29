import type { TIngredientUnit } from "../../components/features/ingredient/ingredient.types";

export const ingredientUnitAnnotationLabels: Record<TIngredientUnit, string> = {
	amount:     "Quantité",
	mass:       "Masse (g)",
	volume:     "Volume (L)",
	tablespoon: "Cuillère à soupe",
	teaspoon:   "Cuillère à café",
};

export const ingredientUnitDirectObjectLabels: Record<TIngredientUnit, string> = {
	amount:     "unités",
	mass:       "grammes",
	volume:     "litres",
	tablespoon: "cuillères à soupe",
	teaspoon:   "cuillères à café",
};

export const ingredientUnitDirectObjectSingularLabels: Record<TIngredientUnit, string> = {
	amount:     "unité",
	mass:       "gramme",
	volume:     "litre",
	tablespoon: "cuillère à soupe",
	teaspoon:   "cuillère à café",
};

export const ingredientUnitDirectObjectShortLabels: Record<TIngredientUnit, string> = {
	amount:     "",
	mass:       "g",
	volume:     "L",
	tablespoon: "c. à soupe",
	teaspoon:   "c. à café",
};