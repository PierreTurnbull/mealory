import type { TStockFormData } from "./stockFormData.types";

export const useOnStockChange = (
	setStockFormData: (value: React.SetStateAction<TStockFormData>) => void,
) => {
	return (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		id: string,
	) => {
		const value = event.target.value;

		if (Number(value) < 0) {
			return;
		}

		setStockFormData(prev => {
			const next = structuredClone(prev);

			next.find(stockFormDataItem => stockFormDataItem.id === id)!.amount.value = value;

			return next;
		});
	};
};