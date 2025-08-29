import type { TPlanningFormData } from "./planningFormData.types";

export const useOnRemoveRecipe = (
	setRecipeFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		key: number,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.recipes.splice(key, 1);

			return next;
		});
	};
};