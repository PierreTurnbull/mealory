import type { TIngredient } from "../ingredient/ingredient.types";
import type { TRecipeIngredient } from "../recipe/recipe.types";
import type { TMenu } from "./menu.types";

export type TPlanningDay = {
	lunch:  TMenu
	dinner: TMenu
}

export type TIngredientInStock = {
	id:     TIngredient["id"]
	amount: number | null
}

export type TTotalIngredient = {
		id:     TIngredient["id"]
		name:   TIngredient["name"]
		amount: TRecipeIngredient["amount"]
		unit:   TIngredient["unit"]
	}

export type TPlanning = {
	id:                  string
	startDate:           Date
	endDate:             Date
	planningDays:        TPlanningDay[]
	ingredientsInStock:  TIngredientInStock[]
	ingredientsObtained: TIngredient["id"][]
}