import type { SelectChangeEvent } from "@mui/material";
import type { TIngredientCategory } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useOnCategoryChange = (
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const onCategoryChange = (
		event: SelectChangeEvent<TIngredientCategory>,
	) => {
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
				
			next.category = {
				value: event.target.value,
			};

			return next;
		});
	};

	return onCategoryChange;
};