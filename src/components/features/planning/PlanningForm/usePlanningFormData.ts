import { useState } from "react";
import { v4 } from "uuid";
import type { TPlanning } from "../planning.types";
import type { TPlanningDishFormData, TPlanningFormData, TPlanningMealDishFormData, TPlanningMealFormData } from "./planningFormData.types";

export const usePlanningFormData = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
) => {
	const [planningFormData, setPlanningFormData] = useState<TPlanningFormData>({
		dishes: planning.dishes.map(recipe => {
			const planningDishFormData: TPlanningDishFormData = {
				id:       v4(),
				recipeId: recipe.recipeId,
				portions: {
					value: String(recipe.portions),
				},
			};

			return planningDishFormData;
		}),
		meals: planning.meals.map(meal => {
			const planningMealFormData: TPlanningMealFormData = {
				id:     v4(),
				dishes: meal.dishes.map(dish => {
					const dishFormData: TPlanningMealDishFormData = {
						recipeId: dish.recipeId,
					};

					return dishFormData;
				}),
				portions: {
					value: String(meal.portions),
				},
			};

			return planningMealFormData;
		}),
	});

	return [planningFormData, setPlanningFormData] as const;
};