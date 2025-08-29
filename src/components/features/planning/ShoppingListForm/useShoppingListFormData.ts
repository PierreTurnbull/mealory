import { useState } from "react";
import type { TPlanning } from "../planning.types";
import { getIngredientsToObtain } from "../utils/getIngredientsToObtain/getIngredientsToObtain";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TIngredientObtainedFormData, TShoppingListFormData } from "./shoppingListFormData.types";

export const useShoppingListFormData = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
) => {
	const totalIngredients = getTotalIngredients(planning.recipes);
	const ingredientsToObtain = getIngredientsToObtain(totalIngredients, planning.ingredientsInStock);

	const initialShoppingListFormData = Object.entries(ingredientsToObtain)
		.filter(entry => entry[1] > 0)
		.map(entry => {
			const key = entry[0];

			const ingredientObtained: TIngredientObtainedFormData = {
				id:         key,
				isObtained: {
					value: planning.ingredientsObtained.includes(key),
				},
			};

			return ingredientObtained;
		});

	const [shoppingListFormData, setShoppingListFormData] = useState<TShoppingListFormData>(initialShoppingListFormData);

	return [shoppingListFormData, setShoppingListFormData] as const;
};