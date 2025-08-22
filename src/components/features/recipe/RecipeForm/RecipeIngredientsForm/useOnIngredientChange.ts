import type { TRecipeFormData } from "../recipeFormData.types";
import type { TIngredientChoice } from "./ingredientChoice.types";

export const useOnIngredientChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onIngredientChange = (
		key: number,
		value: TIngredientChoice | null,
	) => {
		if (!value) {
			return;
		}

		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			const nextRecipeIngredient = next.ingredients[key];
			nextRecipeIngredient.id.value = value.id;
			nextRecipeIngredient.amount.value = "";
			nextRecipeIngredient.unit.value = null;

			return next;
		});
	};

	return onIngredientChange;
};