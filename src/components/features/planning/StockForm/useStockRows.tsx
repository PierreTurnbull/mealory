import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Input } from "@mui/material";
import type { TTableRow } from "../../../common/Table/table.types";
import { getIngredientsWithDefaults } from "../../ingredient/defaultIngredients/getIngredientsWithDefaults";
import { ingredientUnitTypesConfig } from "../../ingredient/ingredientUnits.model";
import type { TPlanning } from "../planning.types";
import { getIngredientsToObtain } from "../utils/getIngredientsToObtain/getIngredientsToObtain";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TStockFormData } from "./stockFormData.types";

export const useStockRows = (
	planning: Omit<TPlanning, "id">,
	stockFormData: TStockFormData,
	onStockChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => void,
	setMaxIngredientInStock: (id: string, maxIngredientInStock: number) => void,
	resetMaxIngredientInStock: (id: string) => void,
) => {
	const ingredients = getIngredientsWithDefaults();

	const totalIngredients = getTotalIngredients(planning);
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

		const unitShortLabel = ingredientUnitTypesConfig[ingredient.referenceUnitType].units[ingredientUnitTypesConfig[ingredient.referenceUnitType].referenceUnit]?.labelShort;

		const ingredientInStockIsMax = Number(stockFormDataItem.amount.value) >= totalAmount;

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
					label: (
						<span className="flex gap-2 justify-between w-full items-center">
							<span className="whitespace-nowrap">{`${totalAmount} ${unitShortLabel}`}</span>
							{
								ingredientInStockIsMax
									? (
										<IconButton
											size="small"
											onClick={() => resetMaxIngredientInStock(ingredient.id)}
										>
											<RefreshIcon />
										</IconButton>
									)
									: (
										<IconButton
											size="small"
											onClick={() => setMaxIngredientInStock(ingredient.id, totalAmount)}
										>
											<ArrowForwardIcon />
										</IconButton>
									)
							}
						</span>
					),
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
							`}
						>
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
					label: <span className="whitespace-nowrap">{amountToObtain} {unitShortLabel}</span>,
					value: amountToObtain,
				},
			],
			isDimmed: amountToObtain === 0,
		};

		return stockRow;
	});

	return stockRows;
};