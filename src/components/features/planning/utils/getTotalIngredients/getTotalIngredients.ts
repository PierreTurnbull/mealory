import { getReferenceAmount } from "../../../../../utils/getReferenceAmount/getReferenceAmount";
import type { TIngredient } from "../../../ingredient/ingredient.types";
import type { TRecipe, TRecipeIngredient } from "../../../recipe/recipe.types";
import type { TPlanning, TTotalIngredient } from "../../planning.types";

export const getTotalIngredients = (
	ingredients: TIngredient[],
	recipes: TRecipe[],
	planning: TPlanning,
) => {
	const totalIngredients: TTotalIngredient[] = [];

	planning.planningDays.forEach(planningDay => {
		const lunch = recipes.find(recipe => recipe.id === planningDay.lunch.recipeId);
		const dinner = recipes.find(recipe => recipe.id === planningDay.dinner.recipeId);

		const registerIngredients = (
			recipe: TRecipe,
		) => {
			const fullIngredients = recipe.ingredients.map<TIngredient & TRecipeIngredient>(recipeIngredient => {
				const ingredient = ingredients.find(ingredient => ingredient.id === recipeIngredient.id);

				if (!ingredient) {
					throw new Error(`Missing ingredient with id ${recipeIngredient.id}.`);
				}

				return {
					...recipeIngredient,
					...ingredient,
				};
			});

			fullIngredients.forEach(ingredient => {
				const totalIngredient = totalIngredients.find(totalIngredient => totalIngredient.id === ingredient.id);

				const referenceAmount = getReferenceAmount(ingredient);

				if (totalIngredient) {
					if (totalIngredient.amount === null) {
						totalIngredient.amount = 0;
					}
					totalIngredient.amount += referenceAmount;
				} else {
					const totalIngredient = {
						id:     ingredient.id,
						name:   ingredient.name,
						unit:   ingredient.unit,
						amount: referenceAmount,
					};

					totalIngredients.push(totalIngredient);
				}
			});
		};

		if (lunch) {
			registerIngredients(lunch);
		}
		if (dinner) {
			registerIngredients(dinner);
		}
	});

	return totalIngredients;
};