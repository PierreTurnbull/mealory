import type { TIngredientUnit } from "../../components/features/ingredient/ingredient.types";

export const ingredientUnitAnnotationLabels: Record<TIngredientUnit, string> = {
	amount:     "Quantité",
	gram:       "Gramme",
	liter:      "Litre",
	tablespoon: "Cuillère à soupe",
	teaspoon:   "Cuillère à café",
};

export const ingredientUnitDirectObjectLabels: Record<TIngredientUnit, string> = {
	amount:     "unités",
	gram:       "grammes",
	liter:      "litres",
	tablespoon: "cuillères à soupe",
	teaspoon:   "cuillères à café",
};

export const ingredientUnitDirectObjectSingularLabels: Record<TIngredientUnit, string> = {
	amount:     "unité",
	gram:       "gramme",
	liter:      "litre",
	tablespoon: "cuillère à soupe",
	teaspoon:   "cuillère à café",
};

export const ingredientUnitDirectObjectShortLabels: Record<TIngredientUnit, string> = {
	amount:     "",
	gram:       "g",
	liter:      "L",
	tablespoon: "c. à soupe",
	teaspoon:   "c. à café",
};