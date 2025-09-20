import { getReferenceAmount } from "../../../../../utils/getReferenceAmount/getReferenceAmount";
import { getIngredientsWithDefaults } from "../../../ingredient/defaultIngredients/getIngredientsWithDefaults";
import { roundAmount } from "../../../ingredient/roundAmount";
import { getRecipes } from "../../../recipe/recipe.api";
import type { TIngredientInStock, TPlanning } from "../../planning.types";

/**
 * Returns the total ingredients required for the planning passed as param.
 */
export const getTotalIngredients = (
	planningRecipes: TPlanning["recipes"],
) => {
	const ingredients = getIngredientsWithDefaults();
	const recipes = getRecipes();

	const totalIngredients: Record<TIngredientInStock["id"], number> = {};
	ingredients.map(ingredient => {
		totalIngredients[ingredient.id] = 0;
	});

	planningRecipes.forEach(planningRecipe => {
		const recipe = recipes.find(recipe => recipe.id === planningRecipe.id);

		if (!recipe) {
			throw new Error((`Missing recipe with id ${planningRecipe.id}`));
		}

		recipe.ingredients.forEach(recipeIngredient => {
			const currentTotal = totalIngredients[recipeIngredient.id];

			if (currentTotal === undefined) {
				throw new Error(`Missing ingredient with id ${recipeIngredient.id}.`);
			}

			let amount = getReferenceAmount(recipeIngredient);
			amount = amount * planningRecipe.portions;

			const totalAmount = roundAmount(currentTotal + amount);
			totalIngredients[recipeIngredient.id] = totalAmount;
		});
	});

	for (const ingredientId in totalIngredients) {
		const totalIngredient = totalIngredients[ingredientId];

		if (totalIngredient === 0) {
			delete totalIngredients[ingredientId];
		}
	}

	return totalIngredients;
};