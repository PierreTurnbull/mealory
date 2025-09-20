import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnAvailableUnitTypesChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onAvailableUnitTypesChange = (
		value: TIngredientFormData["availableUnitTypes"]["value"],
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.availableUnitTypes = {
				value: value,
			};

			return next;
		});
	};

	return onAvailableUnitTypesChange;
};