import type { TRecipeFormData } from "../recipeFormData.types";

export const useOnUnitChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onUnitChange = (
		value: Exclude<TRecipeFormData["ingredients"][number]["unit"], null>["value"],
		key: number,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.ingredients[key].unit!.value = value;

			return next;
		});
	};

	return onUnitChange;
};