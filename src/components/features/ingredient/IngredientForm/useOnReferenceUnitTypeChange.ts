import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnReferenceUnitTypeChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onReferenceUnitTypeChange = (
		value: TIngredientFormData["referenceUnitType"]["value"],
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);

			next.referenceUnitType = {
				value: value,
			};

			return next;
		});
	};

	return onReferenceUnitTypeChange;
};