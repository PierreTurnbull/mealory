import type { TIngredient } from "../ingredient/ingredient.types";
import type { TRecipe } from "../recipe/recipe.types";

export type TPlanningRecipe = {
	id:       TRecipe["id"],
	portions: number,
}

export type TIngredientInStock = {
	id:     TIngredient["id"]
	amount: number
}

export type TPlanning = {
	id:                  string
	recipes:             TPlanningRecipe[]
	ingredientsInStock:  TIngredientInStock[]
	ingredientsObtained: TIngredient["id"][]
}