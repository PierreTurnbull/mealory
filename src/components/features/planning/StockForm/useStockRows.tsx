import { Input } from "@mui/material";
import { ingredientUnitDirectObjectShortLabels } from "../../../../utils/labels/ingredientUnits";
import type { TTableRow } from "../../../common/Table/table.types";
import { getIngredients } from "../../ingredient/ingredient.api";
import type { TPlanning } from "../planning.types";
import { getIngredientsToObtain } from "../utils/getIngredientsToObtain/getIngredientsToObtain";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TStockFormData } from "./stockFormData.types";

export const useStockRows = (
	planningRecipes: TPlanning["recipes"],
	stockFormData: TStockFormData,
	onStockChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => void,
) => {
	const ingredients = getIngredients();

	const totalIngredients = getTotalIngredients(planningRecipes);
	const ingredientsInStock = stockFormData.map(stockFormDataItem => {
		const ingredientInStock: TPlanning["ingredientsInStock"][number] = {
			id:     stockFormDataItem.id,
			amount: Number(stockFormDataItem.amount.value),
		};

		return ingredientInStock;
	});
	const ingredientsToObtain = getIngredientsToObtain(totalIngredients, ingredientsInStock);

	const stockRows = Object.entries(totalIngredients).map(entry => {
		const id = entry[0];
		const totalAmount = entry[1];

		const ingredient = ingredients.find(ingredient => ingredient.id === id);

		if (!ingredient) {
			throw new Error(`Missing ingredient with id ${id}`);
		}

		const stockFormDataItem = stockFormData.find(stockFormDataItem => stockFormDataItem.id === id)!;

		const amountToObtain = ingredientsToObtain[id];

		const unitShortLabel = ingredientUnitDirectObjectShortLabels[ingredient.referenceUnit];
		const stockRow: TTableRow = {
			key:   id,
			items: [
				{
					key:   "name",
					label: ingredient.name,
					value: ingredient.name,
				},
				{
					key:   "totalNeeded",
					label: `${totalAmount} ${ingredientUnitDirectObjectShortLabels[ingredient.referenceUnit]}`,
					value: totalAmount,
				},
				{
					key:   "stock",
					label: (
						<span
							className={`
								flex
								flex-row
								gap-2
								items-center
								${unitShortLabel ? "pr-2" : ""}
							`}>
							<Input
								style={{
									width: 60,
								}}
								value={stockFormDataItem.amount.value}
								onChange={(event) => onStockChange(event, id)}
								type="number"
							/>
							{
								unitShortLabel
									? <span>{unitShortLabel}</span>
									: null
							}
						</span>
					),
					value:             Number(stockFormDataItem.amount.value),
					paddingIsDisabled: true,
				},
				{
					key:   "remainingToObtain",
					label: `${amountToObtain} ${ingredientUnitDirectObjectShortLabels[ingredient.referenceUnit]}`,
					value: amountToObtain,
				},
			],
			isDimmed: amountToObtain === 0,
		};

		return stockRow;
	});

	return stockRows;
};