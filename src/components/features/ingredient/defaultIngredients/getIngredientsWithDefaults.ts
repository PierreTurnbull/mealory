import { getIngredients } from "../ingredient.api";
import { defaultIngredients } from "./defaultIngredients";

/**
 * Returns a list including both persisted and default ingredients. Persisted ingredients that are
 * also a default ingredient replace the default one in this list.
 */
export const getIngredientsWithDefaults = () => {
	const ingredients = getIngredients();

	const ingredientsWithDefaults = [
		...defaultIngredients,
		...ingredients,
	];

	return ingredientsWithDefaults;
};