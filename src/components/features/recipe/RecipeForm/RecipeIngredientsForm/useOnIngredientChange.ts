import { getIngredientWithDefault } from "../../../ingredient/defaultIngredients/getIngredientWithDefault";
import { ingredientUnitTypesConfig } from "../../../ingredient/ingredientUnits.model";
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

		const ingredient = getIngredientWithDefault(value.id);

		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			const nextRecipeIngredient = next.ingredients[key];
			nextRecipeIngredient.id.value = value.id;
			nextRecipeIngredient.amount.value = "";
			const defaultUnit = ingredientUnitTypesConfig[ingredient.referenceUnitType].referenceUnit;
			if (nextRecipeIngredient.unit) {
				nextRecipeIngredient.unit.value = defaultUnit;
			} else  {
				nextRecipeIngredient.unit = {
					value: defaultUnit,
				};
			}

			return next;
		});
	};

	return onIngredientChange;
};