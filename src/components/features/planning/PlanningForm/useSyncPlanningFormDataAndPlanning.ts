import { useEffect } from "react";
import type { TPlanning, TPlanningMealDish } from "../planning.types";
import type { TPlanningFormData } from "./planningFormData.types";

export const useSyncPlanningFormDataAndPlanning = <T extends TPlanning | Omit<TPlanning, "id">>(
	planningFormData: TPlanningFormData,
	setPlanning: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		setPlanning(prev => {
			const nextPlanning: T = {
				...prev,
				dishes: planningFormData.dishes.map(recipeFormData => {
					const dish: T["dishes"][number] = {
						recipeId: recipeFormData.recipeId,
						portions: Number(recipeFormData.portions.value),
					};

					return dish;
				}),
				meals: planningFormData.meals.map(mealFormData => {
					const meal: T["meals"][number] = {
						dishes: mealFormData.dishes.map(dishFormData => {
							const mealDish: TPlanningMealDish = {
								recipeId: dishFormData.recipeId,
							};

							return mealDish;
						}),
						portions: Number(mealFormData.portions.value),
					};

					return meal;
				}),
			};

			return nextPlanning;
		});
	}, [planningFormData, setPlanning]);
};