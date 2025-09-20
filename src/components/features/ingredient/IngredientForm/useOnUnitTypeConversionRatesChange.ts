import type { TIngredientUnitType } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnUnitTypeConversionRatesChange = (
	ingredientFormData: TIngredientFormData,
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onUnitTypeConversionRatesChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		key: TIngredientUnitType,
	) => {
		const nextValue = Number(event.target.value);

		if (nextValue < 0) {
			return;
		}

		setIngredientFormData(prev => {
			const next = structuredClone(prev);

			const nextUnitTypeConversionRates = structuredClone(ingredientFormData.unitTypeConversionRates.value);
			nextUnitTypeConversionRates[key] = String(nextValue);
	
			next.unitTypeConversionRates = {
				value: nextUnitTypeConversionRates,
			};

			return next;
		});
	};

	return onUnitTypeConversionRatesChange;
};