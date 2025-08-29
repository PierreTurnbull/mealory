import type { ChangeEvent } from "react";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnNameChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onNameChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.name = {
				value: event.target.value,
			};

			return next;
		});
	};

	return onNameChange;
};