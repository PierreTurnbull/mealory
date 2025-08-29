import type { TRecipeFormData } from "./recipeFormData.types";

export const useRemoveIngredient = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const removeIngredient = (index: number) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.ingredients.splice(index, 1);

			return next;
		});
	};

	return removeIngredient;
};