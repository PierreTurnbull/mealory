import type { TFormData } from "../../../../types/form/formData.types";

export type TIngredientInStockFormData = {
	id:     string
	amount: TFormData<string>
}

export type TStockFormData = TIngredientInStockFormData[]