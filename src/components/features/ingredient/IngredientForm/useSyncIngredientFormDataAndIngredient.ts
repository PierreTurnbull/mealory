import { useEffect } from "react";
import type { TIngredient } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

/**
 * Keep the ingredient up to date with the ingredient form data.
 */
export const useSyncIngredientFormDataAndIngredient = <T extends TIngredient | Omit<TIngredient, "id">>(
	ingredientFormData: TIngredientFormData,
	setIngredient: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		const unitTypeConversionRates = Object.fromEntries(
			Object.entries(ingredientFormData.unitTypeConversionRates.value)
				.map(entry => {
					let value = entry[1] === "" ? 1 : Number(entry[1]);

					const isDensity = (
						(entry[0] === "mass" && ingredientFormData.referenceUnitType.value === "volume") ||
						(entry[0] === "volume" && ingredientFormData.referenceUnitType.value === "mass")
					);

					// For a better UX, some of the conversion rate interfaces represent the conversion from
					// b to a, instead of a to b.
					if ((entry[0] === "count" || (isDensity && entry[0] === "volume")) && value > 0) {
						value = 1 / value;
					}

					if (isDensity && entry[0] === "volume") {
						value /= 1000;
					}

					return [
						entry[0],
						value,
					];
				}),
		);

		setIngredient(prev => {
			const nextIngredient: T = {
				...prev,
				name:                    ingredientFormData.name.value,
				referenceUnitType:       ingredientFormData.referenceUnitType.value,
				availableUnitTypes:      ingredientFormData.availableUnitTypes.value,
				unitTypeConversionRates: unitTypeConversionRates,
				category:                ingredientFormData.category.value,
			};

			return nextIngredient;
		});
	}, [ingredientFormData, setIngredient]);
};