import type { TPlanning } from "../../planning.types";
import type { getTotalIngredients } from "../getTotalIngredients/getTotalIngredients";

/**
 * Returns the remaining ingredients to obtain.
 */
export const getIngredientsToObtain = (
	totalIngredients: ReturnType<typeof getTotalIngredients>,
	ingredientsInStock: TPlanning["ingredientsInStock"],
) => {
	const ingredientsToObtain = structuredClone(totalIngredients);

	ingredientsInStock.forEach(ingredientInStock => {
		ingredientsToObtain[ingredientInStock.id] -= ingredientInStock.amount;

		if (ingredientsToObtain[ingredientInStock.id] < 0) {
			ingredientsToObtain[ingredientInStock.id] = 0;
		}
	});

	return ingredientsToObtain;
};