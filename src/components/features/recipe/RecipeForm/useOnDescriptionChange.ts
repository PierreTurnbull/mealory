import type { ChangeEvent } from "react";
import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnDescriptionChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onDescriptionChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.description = {
				value: event.target.value,
			};

			return next;
		});
	};

	return onDescriptionChange;
};