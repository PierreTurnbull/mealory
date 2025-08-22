import type { TIngredient } from "../../../ingredient/ingredient.types";

export type TIngredientChoice = {
	id:         TIngredient["id"],
	label:      TIngredient["name"],
	isDisabled: boolean,
}