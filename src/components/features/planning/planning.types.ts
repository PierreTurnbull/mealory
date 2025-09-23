import type { TIngredient } from "../ingredient/ingredient.types";
import type { TRecipe } from "../recipe/recipe.types";

export type TPlanningDish = {
	recipeId: TRecipe["id"],
	portions: number,
}

export type TPlanningMealDish = {
	recipeId: TRecipe["id"],
}

export type TPlanningMeal = {
	dishes:   TPlanningMealDish[]
	portions: number,
}

export type TIngredientInStock = {
	id:     TIngredient["id"]
	amount: number
}

export type TPlanning = {
	id:                  string
	dishes:              TPlanningDish[]
	meals:               TPlanningMeal[]
	ingredientsInStock:  TIngredientInStock[]
	ingredientsObtained: TIngredient["id"][]
}