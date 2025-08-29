import type { ChangeEvent } from "react";
import type { TRecipeFormData } from "../recipeFormData.types";

export const useOnAmountChange = (
	setRecipeFormData: (value: React.SetStateAction<TRecipeFormData>) => void,
) => {
	const onAmountChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		key: number,
	) => {
		const value = event.target.value;

		if (Number(value) < 0) {
			return;
		}

		setRecipeFormData(prev => {
			const next = structuredClone(prev);
				
			next.ingredients[key].amount.value = value;

			return next;
		});
	};

	return onAmountChange;
};