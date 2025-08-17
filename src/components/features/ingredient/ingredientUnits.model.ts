import type { TIngredientUnit, TReferenceIngredientUnit } from "./ingredient.types";

type TIngredientUnitDetails = {
	universalRates: Partial<Record<TIngredientUnit, number>>
}

export const ingredientUnitsModel: Record<TReferenceIngredientUnit, TIngredientUnitDetails> = {
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
};