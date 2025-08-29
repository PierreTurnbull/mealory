import type { TIngredientUnit } from "./ingredient.types";

type TIngredientUnitDetails = {
	universalRates: Partial<Record<TIngredientUnit, number>>
}

export const ingredientUnitsModel: Record<TIngredientUnit, TIngredientUnitDetails> = {
	amount: {
		universalRates: {},
	},
	mass: {
		universalRates: {},
	},
	volume: {
		universalRates: {
			teaspoon:   0.005,
			tablespoon: 0.015,
		},
	},
	teaspoon: {
		universalRates: {},
	},
	tablespoon: {
		universalRates: {},
	},
};