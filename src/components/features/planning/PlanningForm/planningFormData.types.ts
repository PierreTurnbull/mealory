import type { TFormData } from "../../../../types/form/formData.types";
import type { TRecipe } from "../../recipe/recipe.types";

export type TPlanningDishFormData = {
	id:       string // not stored, required only to prevent React list-related bugs
	recipeId: TRecipe["id"],
	portions: TFormData<string>,
}

export type TPlanningMealDishFormData = {
	recipeId: TRecipe["id"],
}

export type TPlanningMealFormData = {
	id:       string // not stored, required only to prevent React list-related bugs
	dishes:   TPlanningMealDishFormData[]
	portions: TFormData<string>,
}

export type TPlanningFormData = {
	dishes: TPlanningDishFormData[]
	meals:  TPlanningMealFormData[]
}