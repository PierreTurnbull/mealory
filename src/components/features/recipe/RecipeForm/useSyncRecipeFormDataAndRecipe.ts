import { useEffect } from "react";
import type { TRecipe } from "../recipe.types";
import type { TRecipeFormData } from "./recipeFormData.types";

/**
 * Keep the recipe up to date with the recipe form data.
 */
export const useSyncRecipeFormDataAndRecipe = <T extends TRecipe | Omit<TRecipe, "id">>(
	recipeFormData: TRecipeFormData,
	setRecipe: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		setRecipe(prev => {
			const nextRecipe: T = {
				...prev,
				name:        recipeFormData.name.value,
				description: recipeFormData.description.value,
				imageUrl:    recipeFormData.imageUrl.value || null,
				ingredients: recipeFormData.ingredients.map(ingredientFormData => {
					return {
						id:     ingredientFormData.id.value,
						amount: Number(ingredientFormData.amount.value) || null,
						unit:   ingredientFormData.unit.value,
					};
				}),
				instructions: recipeFormData.instructions.map(instructionFormData => instructionFormData.value),
			};

			return nextRecipe;
		});
	}, [recipeFormData, setRecipe]);
};