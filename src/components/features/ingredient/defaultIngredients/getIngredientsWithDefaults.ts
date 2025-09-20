import { getIngredients } from "../ingredient.api";
import { defaultIngredients } from "./defaultIngredients";

/**
 * Returns a list including both persisted and default ingredients. Persisted ingredients that are
 * also a default ingredient replace the default one in this list.
 */
export const getIngredientsWithDefaults = () => {
	const ingredients = getIngredients();

	const ingredientsWithDefaults = [
		...ingredients,
	];

	for (const defaultIngredient of defaultIngredients) {
		const ingredientWasPersisted = ingredientsWithDefaults.find(ingredient => ingredient.id === defaultIngredient.id);

		if (!ingredientWasPersisted) {
			ingredientsWithDefaults.push(defaultIngredient);
		}
	}

	return ingredientsWithDefaults;
};