import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnAvailableUnitsChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onAvailableUnitsChange = (
		value: TIngredientFormData["availableUnits"]["value"],
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.availableUnits = {
				value: value,
			};

			return next;
		});
	};

	return onAvailableUnitsChange;
};