import { v4 } from "uuid";
import type { TIngredient } from "./ingredient.types";

export const getIngredient = (
	id: TIngredient["id"],
) => {
	const ingredients = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];

	const ingredient = ingredients.find(ingredient => ingredient.id === id);

	return ingredient;
};

export const getIngredients = () => {
	const ingredients = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];

	return ingredients;
};

export const createIngredient = (
	ingredient: Omit<TIngredient, "id">,
) => {
	const ingredients = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];

	const ingredientWithId = {
		id: v4(),
		...ingredient,
	};

	ingredients.push(ingredientWithId);

	localStorage.ingredients = JSON.stringify(ingredients);
};

export const updateIngredient = (
	id: TIngredient["id"],
	nextIngredient: TIngredient,
) => {
	const ingredients = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];

	const prevIngredientIndex = ingredients.findIndex(ingredient => ingredient.id === id);

	if (prevIngredientIndex === -1) {
		throw new Error(`Missing ingredient with id ${id}.`);
	}

	const prevIngredient = ingredients[prevIngredientIndex];

	const ingredient = {
		...prevIngredient,
		...nextIngredient,
	};

	ingredients.splice(prevIngredientIndex, 1, ingredient);

	localStorage.ingredients = JSON.stringify(ingredients);
};

export const deleteIngredient = (
	id: TIngredient["id"],
) => {
	const ingredients = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];

	const prevIngredientIndex = ingredients.findIndex(ingredient => ingredient.id === id);

	if (prevIngredientIndex === -1) {
		throw new Error(`Missing ingredient with id ${id}.`);
	}

	ingredients.splice(prevIngredientIndex, 1);

	localStorage.ingredients = JSON.stringify(ingredients);
};