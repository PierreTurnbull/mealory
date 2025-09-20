import { useEffect } from "react";
import type { TIngredientFormData } from "./ingredientFormData.types";


/**
 * Ensure the reference unit is part of the available units.
 */
export const useSyncReferenceUnitTypeAndAvailableUnitTypes = (
	ingredientFormData: TIngredientFormData,
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	useEffect(() => {
		if (ingredientFormData.availableUnitTypes.value.includes(ingredientFormData.referenceUnitType.value)) {
			return;
		}
	
		setIngredientFormData(prev => {
			const next = structuredClone(prev);
	
			next.availableUnitTypes.value.push(next.referenceUnitType.value);
	
			return next;
		});
	}, [ingredientFormData, setIngredientFormData]);
};