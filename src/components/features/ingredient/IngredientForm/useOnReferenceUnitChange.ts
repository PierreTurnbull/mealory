import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnReferenceUnitChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onReferenceUnitChange = (
		value: TIngredientFormData["referenceUnit"]["value"],
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.referenceUnit = {
				value: value,
			};

			return next;
		});
	};

	return onReferenceUnitChange;
};