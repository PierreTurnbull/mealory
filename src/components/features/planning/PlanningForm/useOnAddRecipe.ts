import type { TRecipe } from "../../recipe/recipe.types";
import type { TPlanningFormData, TPlanningRecipeFormData } from "./planningFormData.types";

export const useOnAddRecipe = (
	setRecipeFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
	setAddRecipeModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	defaultPortions: number,
) => {
	return (
		id: TRecipe["id"],
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			const planningRecipeFormData: TPlanningRecipeFormData = {
				id:       id,
				portions: {
					value: String(defaultPortions),
				},
			};

			next.recipes.push(planningRecipeFormData);

			return next;
		});

		setAddRecipeModalIsOpen(false);
	};
};