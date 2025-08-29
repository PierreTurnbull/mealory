import { useState } from "react";
import type { TPlanning } from "../planning.types";
import type { TPlanningFormData, TPlanningRecipeFormData } from "./planningFormData.types";

export const usePlanningFormData = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
) => {
	const [planningFormData, setplanningFormData] = useState<TPlanningFormData>({
		recipes: planning.recipes.map(recipe => {
			const planningRecipeFormData: TPlanningRecipeFormData = {
				id:       recipe.id,
				portions: {
					value: String(recipe.portions),
				},
			};

			return planningRecipeFormData;
		}),
	});

	return [planningFormData, setplanningFormData] as const;
};