import type { TStockFormData } from "./stockFormData.types";

export const useSetMaxIngredientInStock = (
	setStockFormData: React.Dispatch<React.SetStateAction<TStockFormData>>,
) => {
	return (
		id: string,
		maxIngredientInStock: number,
	) => {
		setStockFormData(prev => {
			const next = structuredClone(prev);

			next.find(stockFormDataItem => stockFormDataItem.id === id)!.amount.value = String(maxIngredientInStock);

			return next;
		});
	};
};