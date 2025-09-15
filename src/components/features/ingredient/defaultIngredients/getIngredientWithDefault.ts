import type { TIngredient } from "../ingredient.types";
import { getIngredientsWithDefaults } from "./getIngredientsWithDefaults";

/**
 * Returns an ingredient, either from the persisted ingredients, or from the default ingredients.
 */
export const getIngredientWithDefault = (id: TIngredient["id"]) => {
	const ingredientsWithDefaults = getIngredientsWithDefaults();

	const ingredientWithDefault = ingredientsWithDefaults.find(ingredient => ingredient.id === id);

	if (!ingredientWithDefault) {
		throw new Error(`Missing ingredient with id ${id}.`);
	}

	return ingredientWithDefault;
};