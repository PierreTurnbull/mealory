import type { TIngredient } from "../ingredient.types";

export const defaultIngredients: TIngredient[] = [
	{
		id:                  "97d8aad9-9cfc-42cc-b258-374c636f793a",
		name:                "Sucre",
		category:            "pantry and dry goods",
		referenceUnit:       "gram",
		availableUnits:      ["pinch", "teaspoon", "tablespoon"],
		unitConversionRates: {
			pinch:      1,
			teaspoon:   1,
			tablespoon: 1,
		},
	},
];