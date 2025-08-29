import type { TRecipeFormData } from "./recipeFormData.types";

export const useSubmitData = (
	recipeFormData: TRecipeFormData,
) => {
	let isDisabled = false;
	let tooltip: string | null = null;
	if (recipeFormData.ingredients.find(recipeIngredient => Number(recipeIngredient.amount.value) === 0)) {
		isDisabled = true;
		tooltip = "Certains ingrédients ont une quantité nulle.";
	}
	if (recipeFormData.ingredients.length === 0) {
		isDisabled = true;
		tooltip = "Ajoute au moins 1 ingrédient.";
	}
	if (recipeFormData.name.value.length === 0) {
		isDisabled = true;
		tooltip = "Ajoute un titre.";
	}

	return [isDisabled, tooltip] as const;
};