import type { TFormData } from "../../../../types/form/formData.types";
import type { TIngredientUnit } from "../../ingredient/ingredient.types";

export type TRecipeIngredientFormData = {
	id:     TFormData<string>
	amount: TFormData<string>
	unit:   TFormData<TIngredientUnit> | null
}

export type TRecipeFormData = {
	name:         TFormData<string>
	description:  TFormData<string>
	ingredients:  TRecipeIngredientFormData[]
	imageUrl:     TFormData<string>
	instructions: TFormData<string>[]
}