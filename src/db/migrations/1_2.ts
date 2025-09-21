import { getIngredients, updateIngredient } from "../../components/features/ingredient/ingredient.api";

export const migration_1_2 = () => {
	const ingredients = getIngredients();

	ingredients.forEach(ingredient => {
		ingredient.category = "other";
		updateIngredient(ingredient.id, ingredient);
	});
};