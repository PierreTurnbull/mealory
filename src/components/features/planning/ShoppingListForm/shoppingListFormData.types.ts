import type { TFormData } from "../../../../types/form/formData.types";

export type TIngredientObtainedFormData = {
	id:         string
	isObtained: TFormData<boolean>
}

export type TShoppingListFormData = TIngredientObtainedFormData[]