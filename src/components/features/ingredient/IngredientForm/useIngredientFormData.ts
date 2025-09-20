import { useState } from "react";
import type { TIngredient } from "../ingredient.types";
import type { TIngredientFormData } from "./ingredientFormData.types";

export const useIngredientFormData = <T extends TIngredient | Omit<TIngredient, "id">>(
	ingredient: T,
) => {
	const unitConversionRateInputValues = Object.fromEntries(
		Object.entries(ingredient.unitTypeConversionRates)
			.map(entry => {
				let value = entry[1];

				const isDensity = (
					(entry[0] === "mass" && ingredient.referenceUnitType === "volume") ||
					(entry[0] === "volume" && ingredient.referenceUnitType === "mass")
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
					String(value),
				];
			}),
	);

	const [ingredientFormData, setIngredientFormData] = useState<TIngredientFormData>({
		name: {
			value: ingredient.name,
		},
		availableUnitTypes: {
			value: ingredient.availableUnitTypes,
		},
		referenceUnitType: {
			value: ingredient.referenceUnitType,
		},
		unitTypeConversionRates: {
			value: unitConversionRateInputValues,
		},
		category: {
			value: ingredient.category,
		},
	});

	return [ingredientFormData, setIngredientFormData] as const;
};