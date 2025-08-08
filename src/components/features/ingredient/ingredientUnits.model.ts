import type { TAliasIngredientUnit, TReferenceIngredientUnit } from "./ingredient.types";

type TIngredientUnitDetails = {
	expressibleIn: TAliasIngredientUnit[]
}

export const ingredientUnitsModel: Record<TReferenceIngredientUnit, TIngredientUnitDetails> = {
	amount: {
		expressibleIn: [],
	},
	mass: {
		expressibleIn: [],
	},
	volume: {
		expressibleIn: [
			"tablespoon",
			"teaspoon",
		],
	},
};