import type { TIngredientInStock, TTotalIngredient } from "../../planning.types";

export const getTotalIngredientsMinusStocks = (
	totalIngredients: TTotalIngredient[],
	ingredientsInStock: TIngredientInStock[],
) => {
	const totalIngredientsMinusStocks = totalIngredients.map(totalIngredient => {
		const totalIngredientMinusStocks = structuredClone(totalIngredient);
		const ingredientInStock = ingredientsInStock.find(ingredientInStock => ingredientInStock.id === totalIngredient.id);

		let amountMinusStock = totalIngredient.amount || 0;
		if (ingredientInStock && ingredientInStock.amount !== null) {
			amountMinusStock = (totalIngredient.amount || 0) - ingredientInStock.amount;
		}
		if (amountMinusStock < 0) {
			amountMinusStock = 0;
		}

		totalIngredientMinusStocks.amount = amountMinusStock;

		return totalIngredientMinusStocks;
	});

	return totalIngredientsMinusStocks;
};