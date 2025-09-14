import { useState } from "react";
import type { TIngredient } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useIngredientFormData = <T extends TIngredient | Omit<TIngredient, "id">>(
	ingredient: T,
) => {
	const unitConversionRateInputValues = Object.fromEntries(
		Object.entries(ingredient.unitConversionRates)
			.map(entry => [
				entry[0],
				String(entry[1]),
			]),
	);

	const [ingredientFormData, setIngredientFormData] = useState<TIngredientFormData>({
		name: {
			value: ingredient.name,
		},
		availableUnits: {
			value: ingredient.availableUnits,
		},
		referenceUnit: {
			value: ingredient.referenceUnit,
		},
		unitConversionRates: {
			value: unitConversionRateInputValues,
		},
		category: {
			value: ingredient.category,
		},
	});

	return [ingredientFormData, setIngredientFormData] as const;
};