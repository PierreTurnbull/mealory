import type { TIngredient } from "../../components/features/ingredient/ingredient.types";
import type { TRecipeIngredient } from "../../components/features/recipe/recipe.types";

export const getReferenceAmount = (
	ingredient: TIngredient & TRecipeIngredient,
) => {
	let amount: number;

	if (ingredient.aliasUnit) {
		if (ingredient.unit === "volume" && ingredient.aliasUnit === "tablespoon") {
			amount = ingredient.amount || 0 * 0.015;
		} else if (ingredient.unit === "volume" && ingredient.aliasUnit === "teaspoon") {
			amount = ingredient.amount || 0 * 0.005;
		} else {
			throw new Error(`Unsupported conversion from ${ingredient.aliasUnit} to ${ingredient.unit}.`);
		}
	} else {
		amount = ingredient.amount || 0;
	}

	return amount;
};