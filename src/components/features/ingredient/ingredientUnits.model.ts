import type { TIngredientUnit, TIngredientUnitType } from "./ingredient.types";

export type TIngredientUnitConfig = {
	[key in TIngredientUnit]?: {
		conversionRate: number
		label:          string
		labelPlural:    string
		labelShort:     string
	}
}

export type TIngredientUnitTypeConfig = {
	label:         string
	units:         TIngredientUnitConfig
	referenceUnit: TIngredientUnit
}

export type TIngredientUnitTypesConfig = Record<TIngredientUnitType, TIngredientUnitTypeConfig>

// Conversion rate is from the unit to the reference unit.
export const ingredientUnitTypesConfig: TIngredientUnitTypesConfig = {
	count: {
		label: "Nombre",
		units: {
			count: {
				label:          "Unité",
				labelPlural:    "Unités",
				labelShort:     "",
				conversionRate: 1,
			},
		},
		referenceUnit: "count",
	},
	mass: {
		label: "Masse",
		units: {
			gram: {
				label:          "Gramme",
				labelPlural:    "Grammes",
				labelShort:     "g",
				conversionRate: 1,
			},
		},
		referenceUnit: "gram",
	},
	volume: {
		label: "Volume",
		units: {
			liter: {
				label:          "Litre",
				labelPlural:    "Litres",
				labelShort:     "L",
				conversionRate: 1,
			},
			tablespoon: {
				label:          "Cuillère à soupe",
				labelPlural:    "Cuillères à soupe",
				labelShort:     "c. à s.",
				conversionRate: 0.015,
			},
			teaspoon: {
				label:          "Cuillère à café",
				labelPlural:    "Cuillères à café",
				labelShort:     "c. à c.",
				conversionRate: 0.005,
			},
			pinch: {
				label:          "Pincée",
				labelPlural:    "Pincées",
				labelShort:     "p.",
				conversionRate: 0.0005,
			},
		},
		referenceUnit: "liter",
	},
};

export const ingredientUnitRoundingPrecision = 3;