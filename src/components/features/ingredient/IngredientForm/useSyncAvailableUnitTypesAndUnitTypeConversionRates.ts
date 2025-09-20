import { useEffect } from "react";
import { usePrev } from "../../../../utils/usePrev/usePrev";
import { roundAmount } from "../roundAmount";
import type { TIngredientFormData, TUnitTypeConversionRateInputValues } from "./ingredientFormData.types";

/**
 * Ensure a unit conversion rate is available for each available unit.
 * 
 * - Changing the available units adds or removes available unit conversion rates.
 * - Changing the reference value resets all previously entered rates.
 * - The conversion rate of pairs of units which have a universal conversion rate are automatically filled.
 * - When defining a reference unit that was already registered as an available unit, the conversion
 * rate is inferred from their previous conversion rate.
 */
export const useSyncAvailableUnitTypesAndUnitTypeConversionRates = (
	ingredientFormData: TIngredientFormData,
	setIngredientFormData: (value: React.SetStateAction<TIngredientFormData>) => void,
) => {
	const prevIngredientFormData = usePrev(ingredientFormData);

	useEffect(() => {
		const prevAvailableUnitTypes = structuredClone(prevIngredientFormData.availableUnitTypes.value).sort();
		const currentAvailableUnitTypes = structuredClone(ingredientFormData.availableUnitTypes.value).sort();

		const prevReferenceUnitType = prevIngredientFormData.referenceUnitType.value;
		const currentReferenceUnitType = ingredientFormData.referenceUnitType.value;

		const availableUnitTypesChanged = JSON.stringify(structuredClone(prevAvailableUnitTypes).sort()) !== JSON.stringify(structuredClone(currentAvailableUnitTypes).sort());
		const referenceUnitTypeChanged = prevReferenceUnitType !== currentReferenceUnitType;

		if (availableUnitTypesChanged || referenceUnitTypeChanged) {
			setIngredientFormData(prev => {
				const next = structuredClone(prev);

				const nextUnitConversionRates: TUnitTypeConversionRateInputValues = {};

				currentAvailableUnitTypes.forEach(currentAvailableUnitType => {
					if (currentAvailableUnitType === currentReferenceUnitType) {
						return;
					}

					const prevValue = prev.unitTypeConversionRates.value[currentAvailableUnitType];
					const oppositeUnitPrevValue = prev.unitTypeConversionRates.value[currentReferenceUnitType];
					const includesCount = currentReferenceUnitType === "count" || currentAvailableUnitType === "count";
					const canReverseValue = !!oppositeUnitPrevValue && prevReferenceUnitType === currentAvailableUnitType;
					const isDensity = (
						(currentAvailableUnitType === "mass" && currentReferenceUnitType === "volume") ||
						(currentAvailableUnitType === "volume" && currentReferenceUnitType === "mass")
					);

					let initialValue: string;

					if (canReverseValue && !includesCount && !isDensity) {
						initialValue = String(roundAmount(1 / Number(oppositeUnitPrevValue)));
					} else if (canReverseValue && (includesCount || isDensity)) {
						initialValue = oppositeUnitPrevValue;
					} else if (!referenceUnitTypeChanged && prevValue !== undefined) {
						initialValue = prevValue;
					} else {
						initialValue = "";
					}
					nextUnitConversionRates[currentAvailableUnitType] = initialValue;
				});

				next.unitTypeConversionRates.value = nextUnitConversionRates;

				return next;
			});
		}
	}, [ingredientFormData, prevIngredientFormData, setIngredientFormData]);
};