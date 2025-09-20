import type { TFormData } from "../../../../types/form/formData.types";
import type { TIngredientCategory, TIngredientUnitType, TUnitTypeConversionRates } from "../ingredient.types";

export type TUnitTypeConversionRateInputValues = {
	[K in keyof TUnitTypeConversionRates]: string
}

export type TIngredientFormData = {
	name:                    TFormData<string>
	referenceUnitType:       TFormData<TIngredientUnitType>
	availableUnitTypes:      TFormData<TIngredientUnitType[]>
	unitTypeConversionRates: TFormData<TUnitTypeConversionRateInputValues>
	category:                TFormData<TIngredientCategory>
}