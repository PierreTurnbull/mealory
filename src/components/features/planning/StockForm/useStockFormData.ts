import { useState } from "react";
import type { TPlanning } from "../planning.types";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TIngredientInStockFormData, TStockFormData } from "./stockFormData.types";

export const useStockFormData = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
) => {
	const totalIngredients = getTotalIngredients(planning.recipes);

	const [stockFormData, setStockFormData] = useState<TStockFormData>(
		Object.entries(totalIngredients).map(entry => {
			const ingredientId = entry[0];

			const ingredientInStock = planning.ingredientsInStock.find(ingredientInStock => ingredientInStock.id === ingredientId);

			const ingredientInStockFormData: TIngredientInStockFormData = {
				id:     ingredientId,
				amount: {
					value: (ingredientInStock === undefined || ingredientInStock.amount === null)
						? ""
						: String(ingredientInStock.amount),
				},
			};

			return ingredientInStockFormData;
		}),
	);

	return [stockFormData, setStockFormData] as const;
};