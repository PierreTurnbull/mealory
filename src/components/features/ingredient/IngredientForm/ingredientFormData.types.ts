import type { TFormData } from "../../../../types/form/formData.types";
import type { TIngredientCategory, TIngredientUnit, TReferenceIngredientUnit, TUnitConversionRates } from "../ingredient.types";

export type TUnitConversionRateInputValues = {
	[K in keyof TUnitConversionRates]: string
}

export type TIngredientFormData = {
	name:                TFormData<string>
	referenceUnit:       TFormData<TReferenceIngredientUnit>
	availableUnits:      TFormData<TIngredientUnit[]>
	unitConversionRates: TFormData<TUnitConversionRateInputValues>
	category:            TFormData<TIngredientCategory>
}