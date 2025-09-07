import type { TIngredientUnit } from "./ingredient.types";

type TIngredientUnitDetails = {
	universalRates: Partial<Record<TIngredientUnit, number>>
}

export const ingredientUnitsModel: Record<TIngredientUnit, TIngredientUnitDetails> = {
	amount: {
		universalRates: {},
	},
	gram: {
		universalRates: {},
	},
	liter: {
		universalRates: {
			pinch:      0.000625,
			teaspoon:   0.005,
			tablespoon: 0.015,
		},
	},
	pinch: {
		universalRates: {},
	},
	teaspoon: {
		universalRates: {},
	},
	tablespoon: {
		universalRates: {},
	},
};