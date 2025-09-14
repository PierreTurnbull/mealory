import { Checkbox } from "@mui/material";
import { ingredientUnitDirectObjectShortLabels } from "../../../../utils/labels/ingredientUnits";
import type { TTableRow } from "../../../common/Table/table.types";
import { getIngredients } from "../../ingredient/ingredient.api";
import type { TIngredientCategory } from "../../ingredient/ingredient.types";
import { ingredientCategories } from "../../ingredient/ingredientCategories";
import type { TPlanning } from "../planning.types";
import { getIngredientsToObtain } from "../utils/getIngredientsToObtain/getIngredientsToObtain";
import { getTotalIngredients } from "../utils/getTotalIngredients/getTotalIngredients";
import type { TIngredientObtainedFormData, TShoppingListFormData } from "./shoppingListFormData.types";
import { useOnIsObtainedChange } from "./useOnIsObtainedChange";

export const useShoppingListRows = <T extends TPlanning | Omit<TPlanning, "id">>(
	planning: T,
	shoppingListFormData: TShoppingListFormData,
	onIsObtainedChange: ReturnType<typeof useOnIsObtainedChange>,
) => {
	const ingredients = getIngredients();
	const totalIngredients = getTotalIngredients(planning.recipes);
	const ingredientsToObtain = getIngredientsToObtain(totalIngredients, planning.ingredientsInStock);

	type TByCategory = {
		[key in TIngredientCategory]?: TIngredientObtainedFormData[]
	}
	const shoppingListFormDataByCategory: TByCategory = {};

	shoppingListFormData.forEach(shoppingListFormDataItem => {
		const ingredient = ingredients.find(ingredient => ingredient.id === shoppingListFormDataItem.id)!;
		const categoryList = shoppingListFormDataByCategory[ingredient.category];

		if (categoryList) {
			categoryList.push(shoppingListFormDataItem);
		} else {
			shoppingListFormDataByCategory[ingredient.category] = [shoppingListFormDataItem];
		}
	});

	const shoppingListRows: TTableRow[] = Object.entries(shoppingListFormDataByCategory)
		.sort((a, b) => {
			if (a[0] === "other") return 1;
			if (b[0] === "other") return -1;
			return 0;
		})
		.map(entry => {
			const category = entry[0] as TIngredientCategory;

			const headRow: TTableRow = {
				key:   `category: ${category}`,
				items: [
					{
						key:   "name",
						label: <p className="font-bold">{ingredientCategories[category].label}</p>,
						value: category,
					},
					{
						key:   "amount",
						label: "",
						value: "",
					},
					{
						key:   "isObtained",
						label: "",
						value: "",
					},
				],
				backgroundIsDisabled: true,
			};

			const shoppingListRows = entry[1].map(shoppingListFormDataItem => {{
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
			}
			});

			return [headRow, shoppingListRows];
		})
		.flat(2);

	return shoppingListRows;
};