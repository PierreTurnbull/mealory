import { Checkbox } from "@mui/material";
import { ingredientUnitDirectObjectShortLabels } from "../../../../utils/labels/ingredientUnits";
import type { TTableRow } from "../../../common/Table/table.types";
import { getIngredients } from "../../ingredient/ingredient.api";
import type { TPlanning } from "../planning.types";
import { getIngredientsToObtain } from "../utils/getIngredientsToObtain/getIngredientsToObtain";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TShoppingListFormData } from "./shoppingListFormData.types";
import { useOnIsObtainedChange } from "./useOnIsObtainedChange";

export const useShoppingListRows = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
	shoppingListFormData: TShoppingListFormData,
	onIsObtainedChange: ReturnType<typeof useOnIsObtainedChange>,
) => {
	const ingredients = getIngredients();
	const totalIngredients = getTotalIngredients(planning.recipes);
	const ingredientsToObtain = getIngredientsToObtain(totalIngredients, planning.ingredientsInStock);

	const shoppingListRows: TTableRow[] = shoppingListFormData.map(shoppingListFormDataItem => {
		const ingredient = ingredients.find(ingredient => ingredient.id === shoppingListFormDataItem.id);

		if (!ingredient) {
			throw new Error(`Missing ingredient with id ${shoppingListFormDataItem.id}.`);
		}

		const ingredientToObtain = ingredientsToObtain[ingredient.id];

		const shoppingListRow: TTableRow = {
			key:   shoppingListFormDataItem.id,
			items: [
				{
					key:   "name",
					label: ingredient.name,
					value: ingredient.name,
				},
				{
					key:   "amount",
					label: `${ingredientToObtain} ${ingredientUnitDirectObjectShortLabels[ingredient.referenceUnit]}`,
					value: ingredientToObtain,
				},
				{
					key:   "isObtained",
					label: (
						<Checkbox
							color="primary"
							checked={shoppingListFormDataItem.isObtained.value}
							onChange={event => onIsObtainedChange(event, ingredient.id)}
						/>
					),
					value: shoppingListFormDataItem.isObtained.value,
				},
			],
			isDimmed: shoppingListFormDataItem.isObtained.value,
		};

		return shoppingListRow;
	});

	return shoppingListRows;
};