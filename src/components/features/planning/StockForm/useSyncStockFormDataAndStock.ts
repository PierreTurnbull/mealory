import { useEffect } from "react";
import type { TIngredientInStock, TPlanning } from "../planning.types";
import type { TStockFormData } from "./stockFormData.types";

export const useSyncStockFormDataAndStock = <T extends TPlanning | Omit<TPlanning, "id">>(
	stockFormData: TStockFormData,
	setPlanning: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		setPlanning(prev => {
			const nextPlanning: T = {
				...prev,
				ingredientsInStock: stockFormData.map(stockFormDataItem => {
					const ingredientInStock: TIngredientInStock = {
						id:     stockFormDataItem.id,
						amount: Number(stockFormDataItem.amount.value),
					};

					return ingredientInStock;
				}),
			};

			return nextPlanning;
		});
	}, [stockFormData, setPlanning]);
};