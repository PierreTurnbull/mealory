import { roundAmount } from "../../../ingredient/roundAmount";
import type { TPlanning } from "../../planning.types";
import type { getTotalIngredients } from "../getTotalIngredients/getTotalIngredients";

/**
 * Returns the remaining ingredients to obtain.
 */
export const getIngredientsToObtain = (
	totalIngredients: ReturnType<typeof getTotalIngredients>,
	ingredientsInStock: TPlanning["ingredientsInStock"],
) => {
	let ingredientsToObtain = structuredClone(totalIngredients);

	ingredientsInStock.forEach(ingredientInStock => {
		ingredientsToObtain[ingredientInStock.id] -= ingredientInStock.amount;

		if (ingredientsToObtain[ingredientInStock.id] < 0) {
			ingredientsToObtain[ingredientInStock.id] = 0;
		}
	});

	ingredientsToObtain = Object.fromEntries(
		Object.entries(ingredientsToObtain).map(([key, value]) => [key, roundAmount(value)]),
	);

	return ingredientsToObtain;
};