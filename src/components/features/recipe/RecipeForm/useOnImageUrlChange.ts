import type { ChangeEvent } from "react";
import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnImageUrlChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onImageUrlChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.imageUrl = {
				value: event.target.value,
			};

			return next;
		});
	};

	return onImageUrlChange;
};