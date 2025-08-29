import { useEffect } from "react";
import type { TPlanning } from "../planning.types";
import type { TShoppingListFormData } from "./shoppingListFormData.types";

export const useSyncShoppingListFormDataAndShoppingList = <T extends TPlanning | Omit<TPlanning, "id">>(
	shoppingListFormData: TShoppingListFormData,
	setPlanning: React.Dispatch<React.SetStateAction<T>>,
) => {
	useEffect(() => {
		setPlanning(prev => {
			const nextPlanning: T = {
				...prev,
				ingredientsObtained: shoppingListFormData
					.filter(shoppingListFormDataItem => shoppingListFormDataItem.isObtained.value)
					.map(shoppingListFormDataItem => shoppingListFormDataItem.id),
			};

			return nextPlanning;
		});
	}, [shoppingListFormData, setPlanning]);
};