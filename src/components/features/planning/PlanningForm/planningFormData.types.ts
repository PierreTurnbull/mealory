import type { TFormData } from "../../../../types/form/formData.types";
import type { TRecipe } from "../../recipe/recipe.types";

export type TPlanningRecipeFormData = {
	id:       TRecipe["id"],
	portions: TFormData<string>,
}

export type TPlanningFormData = {
	recipes: TPlanningRecipeFormData[]
}