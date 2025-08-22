import type { ChangeEvent } from "react";
import type { TRecipeFormData } from "../recipeFormData.types";

export const useOnAmountChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onAmountChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		key: number,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.ingredients[key].amount.value = event.target.value;

			return next;
		});
	};

	return onAmountChange;
};