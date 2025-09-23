import { getReferenceAmount } from "../../../../../utils/getReferenceAmount/getReferenceAmount";
import { getIngredientsWithDefaults } from "../../../ingredient/defaultIngredients/getIngredientsWithDefaults";
import { roundAmount } from "../../../ingredient/roundAmount";
import { getRecipes } from "../../../recipe/recipe.api";
import type { TRecipe } from "../../../recipe/recipe.types";
import type { TIngredientInStock, TPlanning, TPlanningDish, TPlanningMeal } from "../../planning.types";

type TRecipeData = {
	id:       TRecipe["id"]
	portions: TPlanningDish["portions"] | TPlanningMeal["portions"]
}

/**
 * Returns the total ingredients required for the planning passed as param.
 */
export const getTotalIngredients = (
	planning: Omit<TPlanning, "id">,
) => {
	const ingredients = getIngredientsWithDefaults();
	const recipes = getRecipes();

	const totalIngredients: Record<TIngredientInStock["id"], number> = {};
	ingredients.map(ingredient => {
		totalIngredients[ingredient.id] = 0;
	});

	const recipeDatas: TRecipeData[] = [];

	planning.dishes.forEach(dish => {
		recipeDatas.push({
			id:       dish.recipeId,
			portions: dish.portions,
		});
	});
	planning.meals.forEach(meal => {
		meal.dishes.forEach(dish => {
			recipeDatas.push({
				id:       dish.recipeId,
				portions: meal.portions,
			});
		});
	});

	recipeDatas.forEach(recipeData => {
		const recipe = recipes.find(recipe => recipe.id === recipeData.id);

		if (!recipe) {
			throw new Error((`Missing recipe with id ${recipeData.id}`));
		}

		recipe.ingredients.forEach(recipeIngredient => {
			const currentTotal = totalIngredients[recipeIngredient.id];

			if (currentTotal === undefined) {
				throw new Error(`Missing ingredient with id ${recipeIngredient.id}.`);
			}

			let amount = getReferenceAmount(recipeIngredient);
			amount = amount * recipeData.portions;

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