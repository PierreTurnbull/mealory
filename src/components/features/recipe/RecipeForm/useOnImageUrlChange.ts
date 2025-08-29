import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnImageUrlChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onImageUrlChange = (
		value: string,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.imageUrl = {
				value: value,
			};

			return next;
		});
	};

	return onImageUrlChange;
};