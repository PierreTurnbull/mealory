import { useEffect, useState } from "react";
import type { TIngredient } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useIngredientFormData = <T extends TIngredient | Omit<TIngredient, "id">>(
	ingredient: T,
	setIngredient: React.Dispatch<React.SetStateAction<T>>,
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
	});

	useEffect(() => {
		const unitConversionRates = Object.fromEntries(
			Object.entries(ingredientFormData.unitConversionRates.value)
				.map(entry => [
					entry[0],
					entry[1] === "" ? 0 : Number(entry[1]),
				]),
		);

		setIngredient(prev => {
			const nextIngredient: T = {
				...prev,
				name:                ingredientFormData.name.value,
				referenceUnit:       ingredientFormData.referenceUnit.value,
				availableUnits:      ingredientFormData.availableUnits.value,
				unitConversionRates: unitConversionRates,
			};

			return nextIngredient;
		});
	}, [ingredientFormData, setIngredient]);

	return [ingredientFormData, setIngredientFormData] as const;
};