import { getIngredient } from "../../../ingredient/ingredient.api";
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

		const ingredient = getIngredient(value.id);

		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			const nextRecipeIngredient = next.ingredients[key];
			nextRecipeIngredient.id.value = value.id;
			nextRecipeIngredient.amount.value = "";
			if (nextRecipeIngredient.unit) {
				nextRecipeIngredient.unit.value = ingredient.referenceUnit;
			} else  {
				nextRecipeIngredient.unit = {
					value: ingredient.referenceUnit,
				};
			}

			return next;
		});
	};

	return onIngredientChange;
};