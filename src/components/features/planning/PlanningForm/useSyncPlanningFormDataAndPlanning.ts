import { useEffect } from "react";
import type { TPlanning } from "../planning.types";
import type { TPlanningFormData } from "./planningFormData.types";

export const useSyncPlanningFormDataAndPlanning = <T extends TPlanning | Omit<TPlanning, "id">>(
	planningFormData: TPlanningFormData,
	setPlanning: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		setPlanning(prev => {
			const nextPlanning: T = {
				...prev,
				recipes: planningFormData.recipes.map(recipeFormData => {
					const recipe: T["recipes"][number] = {
						id:       recipeFormData.id,
						portions: Number(recipeFormData.portions.value),
					};

					return recipe;
				}),
			};

			return nextPlanning;
		});
	}, [planningFormData, setPlanning]);
};