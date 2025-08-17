import { useEffect } from "react";
import type { TIngredientFormData } from "./ingredientFormData.types";


/**
 * Ensure the reference unit is part of the available units.
 */
export const useSyncReferenceUnitAndAvailableUnits = (
	ingredientFormData: TIngredientFormData,
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	useEffect(() => {
		if (ingredientFormData.availableUnits.value.includes(ingredientFormData.referenceUnit.value)) {
			return;
		}
	
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
	
			next.availableUnits.value.push(next.referenceUnit.value);
	
			return next;
		});
	}, [ingredientFormData, setIngredientFormData]);
};