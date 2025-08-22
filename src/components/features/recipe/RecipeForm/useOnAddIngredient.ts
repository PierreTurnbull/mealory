import type { TRecipeFormData, TRecipeIngredientFormData } from "./recipeFormData.types";

export const useOnAddIngredient = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onAddIngredient = () => {
		const newIngredientFormData: TRecipeIngredientFormData = {
			amount: {
				value: "",
			},
			id: {
				value: "",
			},
			unit: {
				value: null,
			},
		};

		setRecipeFormData(prev => {
			const next = structuredClone(prev);
			
			next.ingredients.push(newIngredientFormData);

			return next;
		});
	};

	return onAddIngredient;
};