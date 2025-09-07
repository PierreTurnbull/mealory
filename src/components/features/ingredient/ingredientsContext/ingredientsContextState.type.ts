import type { TIngredient } from "../ingredient.types";

export type TIngredientsContextState = {
	ingredients:    TIngredient[]
	setIngredients: React.Dispatch<React.SetStateAction<TIngredient[]>>
	isLoading:      boolean
	setIsLoading:   React.Dispatch<React.SetStateAction<boolean>>
}