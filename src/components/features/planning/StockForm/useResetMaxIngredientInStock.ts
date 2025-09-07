import type { TStockFormData } from "./stockFormData.types";

export const useResetMaxIngredientInStock = (
	setStockFormData: React.Dispatch<React.SetStateAction<TStockFormData>>,
) => {
	return (
		id: string,
	) => {
		setStockFormData(prev => {
			const next = structuredClone(prev);

			next.find(stockFormDataItem => stockFormDataItem.id === id)!.amount.value = "0";

			return next;
		});
	};
};