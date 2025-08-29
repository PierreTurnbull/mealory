import type { TShoppingListFormData } from "./shoppingListFormData.types";

export const useOnIsObtainedChange = (
	setShoppingListFormData: (value: React.SetStateAction<TShoppingListFormData>) => void,
) => {
	return (
		event: React.ChangeEvent<HTMLInputElement>,
		id: string,
	) => {
		setShoppingListFormData(prev => {
			const next = structuredClone(prev);

			next.find(shoppingListFormDataItem => shoppingListFormDataItem.id === id)!.isObtained.value = event.target.checked;

			return next;
		});
	};
};