import type { TIngredient, TIngredientUnit } from "../ingredient/ingredient.types";

export type TRecipeIngredient = {
	id:     TIngredient["id"]
	amount: number
	unit:   TIngredientUnit
}

export type TRecipe = {
	id:           string
	name:         string
	description:  string | null
	ingredients:  TRecipeIngredient[]
	imageUrl:     string | null
	instructions: string[] | null
}