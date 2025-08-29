import { getIngredient } from "../../components/features/ingredient/ingredient.api";
import type { TRecipeIngredient } from "../../components/features/recipe/recipe.types";

/**
 * Returns the amounted converted into the ingredient's reference unit, with a precision of 3
 * decimals.
 * E.g.: let ingredient water have reference unit "volume" and available units: "volume" and
 * "tablespoon". Let the conversion rate of water volume into water tablespoon be 0.015. Let us pass
 * an ingredient with amount === 1 and unit === "tablespoon". 1 liter water will be converted into
 * 0.015 tablespoon, so the return value is 0.015.
 */
export const getReferenceAmount = (
	recipeIngredient: TRecipeIngredient,
) => {
	const ingredient = getIngredient(recipeIngredient.id);

	if (!ingredient) {
		throw new Error(`Missing ingredient with id ${recipeIngredient.id}`);
	}

	if (!ingredient.availableUnits.includes(recipeIngredient.unit)) {
		throw new Error(`Unit ${recipeIngredient.unit} in recipe ingredient ${recipeIngredient.id} is not enabled on this ingredient.`);
	}

	let amount: number;

	if (recipeIngredient.unit === ingredient.referenceUnit) {
		amount = recipeIngredient.amount;
	} else {
		const conversionRate = ingredient.unitConversionRates[recipeIngredient.unit]!;

		amount = Math.round(recipeIngredient.amount * conversionRate * 1000) / 1000;
	}

	return amount;
};