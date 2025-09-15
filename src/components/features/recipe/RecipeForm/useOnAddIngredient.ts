import { getIngredientWithDefault } from "../../ingredient/defaultIngredients/getIngredientWithDefault";
import type { TIngredient } from "../../ingredient/ingredient.types";
import type { TRecipeFormData, TRecipeIngredientFormData } from "./recipeFormData.types";

export const useOnAddIngredient = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onAddIngredient = (
		id?: TIngredient["id"],
	) => {
		const ingredient = id ? getIngredientWithDefault(id) : null;

		const unitFormData: TRecipeIngredientFormData["unit"] | null = ingredient
			? {
				value: ingredient.referenceUnit,
			}
			: null;

		const newIngredientFormData: TRecipeIngredientFormData = {
			amount: {
				value: "",
			},
			id: {
				value: id || "",
			},
			unit: unitFormData,
		};

		setRecipeFormData(prev => {
			const next = structuredClone(prev);
			
			next.ingredients.push(newIngredientFormData);

			return next;
		});
	};

	return onAddIngredient;
};