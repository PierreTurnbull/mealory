import type { TIngredient } from "../ingredient/ingredient.types";
import type { ingredientUnitsModel } from "../ingredient/ingredientUnits.model";

export type TRecipeIngredient = {
	id:        TIngredient["id"]
	amount:    number | null
	aliasUnit: (TIngredient["unit"] | typeof ingredientUnitsModel[TIngredient["unit"]]["expressibleIn"][number]) | null
}

export type TRecipe = {
	id:           number
	name:         string
	description:  string
	ingredients:  TRecipeIngredient[]
	imageUrl:     string | null
	instructions: string[]
}