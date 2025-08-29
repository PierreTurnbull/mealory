import type { TIngredientUnit } from "../../../ingredient/ingredient.types";

export type TUnitChoice = {
	id:                TIngredientUnit
	label:             string
	directObjectLabel: string
	isDisabled:        boolean
}