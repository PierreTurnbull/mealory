import { useState } from "react";
import type { TRecipe } from "../recipe.types";
import type { TRecipeFormData } from "./recipeFormData.types";

export const useRecipeFormData = <T extends TRecipe | Omit<TRecipe, "id">>(
	recipe: T,
) => {
	const [recipeFormData, setRecipeFormData] = useState<TRecipeFormData>({
		name: {
			value: recipe.name,
		},
		description: {
			value: recipe.description || "",
		},
		imageUrl: {
			value: recipe.imageUrl || "",
		},
		ingredients: recipe.ingredients.map(ingredient => {
			return {
				id: {
					value: ingredient.id,
				},
				amount: {
					value: String(ingredient.amount),
				},
				unit: {
					value: ingredient.unit,
				},
			};
		}),
		instructions: recipe.instructions
			? recipe.instructions.map(instruction => {
				return {
					value: instruction,
				};
			})
			: [],
	});

	return [recipeFormData, setRecipeFormData] as const;
};