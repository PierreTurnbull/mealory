import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnUnitConversionRatesChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onUnitConversionRatesChange = (
		value: TIngredientFormData["unitConversionRates"]["value"],
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.unitConversionRates = {
				value: value,
			};

			return next;
		});
	};

	return onUnitConversionRatesChange;
};