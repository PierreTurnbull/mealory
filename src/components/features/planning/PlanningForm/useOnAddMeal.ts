import { v4 } from "uuid";
import type { TRecipe } from "../../recipe/recipe.types";
import type { TPlanningFormData, TPlanningMealDishFormData, TPlanningMealFormData } from "./planningFormData.types";

export const useOnAddMeal = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
	setAddMealModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	defaultPortions: number,
) => {
	return (
		recipeIds: TRecipe["id"][],
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const planningDishFormData: TPlanningMealFormData = {
				id:     v4(),
				dishes: recipeIds.map(recipeId => {
					const dishFormData: TPlanningMealDishFormData = {
						recipeId: recipeId,
					};

					return dishFormData;
				}),
				portions: {
					value: String(defaultPortions),
				},
			};

			next.meals.push(planningDishFormData);

			return next;
		});

		setAddMealModalIsOpen(false);
	};
};