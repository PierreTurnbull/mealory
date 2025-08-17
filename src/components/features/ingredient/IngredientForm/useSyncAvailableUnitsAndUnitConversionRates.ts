import { useEffect } from "react";
import { usePrev } from "../../../../utils/usePrev/usePrev";
import { ingredientUnitsModel } from "../ingredientUnits.model";
import type { TIngredientFormData, TUnitConversionRateInputValues } from "./ingredientFormData.types";

/**
 * Ensure a unit conversion rate is available for each available unit.
 * 
 * - Changing the available units adds or removes available unit conversion rates.
 * - Changing the reference value resets all previously entered rates.
 * - The conversion rate of pairs of units which have a universal conversion rate are automatically filled.
 * - When defining a reference unit that was already registered as an available unit, the conversion
 * rate is inferred from their previous conversion rate.
 */
export const useSyncAvailableUnitsAndUnitConversionRates = (
	ingredientFormData: TIngredientFormData,
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const prevIngredientFormData = usePrev(ingredientFormData);

	useEffect(() => {
		const prevAvailableUnits = structuredClone(prevIngredientFormData.availableUnits.value).sort();
		const currentAvailableUnits = structuredClone(ingredientFormData.availableUnits.value).sort();

		const prevReferenceUnit = prevIngredientFormData.referenceUnit.value;
		const currentReferenceUnit = ingredientFormData.referenceUnit.value;

		const availableUnitsChanged = JSON.stringify(structuredClone(prevAvailableUnits).sort()) !== JSON.stringify(structuredClone(currentAvailableUnits).sort());
		const referenceUnitChanged = prevReferenceUnit !== currentReferenceUnit;

		if (availableUnitsChanged || referenceUnitChanged) {
			setIngredientFormData(prev => {
				const next = structuredClone(prev);

				const nextUnitConversionRates: TUnitConversionRateInputValues = {};

				currentAvailableUnits.forEach(currentAvailableUnit => {
					if (currentAvailableUnit === currentReferenceUnit) {
						return;
					}

					const prevValue = prev.unitConversionRates.value[currentAvailableUnit];
					const oppositeUnitPrevValue = prev.unitConversionRates.value[currentReferenceUnit];

					let initialValue: string;

					const universalRate = ingredientUnitsModel[currentReferenceUnit].universalRates[currentAvailableUnit];

					if (!!oppositeUnitPrevValue && prevReferenceUnit === currentAvailableUnit) {
						initialValue = String(1 / Number(oppositeUnitPrevValue));
					} else if (!referenceUnitChanged && prevValue !== undefined) {
						initialValue = prevValue;
					} else if (universalRate !== undefined) {
						initialValue = String(universalRate);
					} else {
						initialValue = "";
					}
					nextUnitConversionRates[currentAvailableUnit] = initialValue;
				});

				next.unitConversionRates.value = nextUnitConversionRates;

				return next;
			});
		}
	}, [ingredientFormData, prevIngredientFormData, setIngredientFormData]);
};