import type { ChangeEvent } from "react";
import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnNameChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onNameChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.name = {
				value: event.target.value,
			};

			return next;
		});
	};

	return onNameChange;
};