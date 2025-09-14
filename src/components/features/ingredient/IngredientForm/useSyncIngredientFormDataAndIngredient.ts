import { useEffect } from "react";
import type { TIngredient } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

/**
 * Keep the ingredient up to date with the ingredient form data.
 */
export const useSyncIngredientFormDataAndIngredient = <T extends TIngredient | Omit<TIngredient, "id">>(
	ingredientFormData: TIngredientFormData,
	setIngredient: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		const unitConversionRates = Object.fromEntries(
			Object.entries(ingredientFormData.unitConversionRates.value)
				.map(entry => [
					entry[0],
					entry[1] === "" ? 1 : Number(entry[1]),
				]),
		);

		setIngredient(prev => {
			const nextIngredient: T = {
				...prev,
				name:                ingredientFormData.name.value,
				referenceUnit:       ingredientFormData.referenceUnit.value,
				availableUnits:      ingredientFormData.availableUnits.value,
				unitConversionRates: unitConversionRates,
				category:            ingredientFormData.category.value,
			};

			return nextIngredient;
		});
	}, [ingredientFormData, setIngredient]);
};