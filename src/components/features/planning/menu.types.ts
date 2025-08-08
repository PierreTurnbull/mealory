import type { TRecipe } from "../recipe/recipe.types";

export type TMenu = {
	recipeId: TRecipe["id"] | null
}