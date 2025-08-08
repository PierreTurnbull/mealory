import { useEffect, useState } from "react";
import { ingredientUnitDirectObjectShortLabels } from "../../../utils/labels/ingredientUnits";
import { Checkbox } from "../../common/Checkbox/Checkbox";
import { Table } from "../../common/Table/Table";
import type { TSortParameters, TTableColumn, TTableRow } from "../../common/Table/table.types";
import type { TIngredient } from "../../features/ingredient/ingredient.types";
import type { TPlanning } from "../../features/planning/planning.types";
import { getTotalIngredients } from "../../features/planning/utils/getTotalIngredients/getTotalIngredients";
import { getTotalIngredientsMinusStocks } from "../../features/planning/utils/getTotalIngredientsMinusStocks/getTotalIngredientsMinusStocks";
import type { TRecipe } from "../../features/recipe/recipe.types";

export const ShoppingList = () => {
	const ingredients: TIngredient[] = localStorage.ingredients
		? JSON.parse(localStorage.ingredients)
		: [];
	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes)
		: [];
	const planning: TPlanning = localStorage.planning
		? JSON.parse(localStorage.planning)
		: [];

	const [ingredientsObtained, setIngredientsObtained] = useState(planning.ingredientsObtained);

	useEffect(() => {
		const planning: TPlanning = localStorage.planning
			? JSON.parse(localStorage.planning)
			: [];

		planning.ingredientsObtained = ingredientsObtained;

		localStorage.planning = JSON.stringify(planning);
	}, [ingredientsObtained]);

	const totalIngredients = getTotalIngredients(ingredients, recipes, planning);

	const totalIngredientsMinusStocks = getTotalIngredientsMinusStocks(totalIngredients, planning.ingredientsInStock);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>(null);

	const columns: TTableColumn[] = [
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
			width:      "100%",
		},
		{
			key:        "amount",
			label:      "Quantité",
			isSortable: true,
		},
		{
			key:        "actions",
			label:      "",
			isSortable: false,
		},
	];

	const rows: TTableRow[] = totalIngredientsMinusStocks.map(ingredient => {
		const row: TTableRow = {
			key:      ingredient.id,
			isDimmed: ingredientsObtained.includes(ingredient.id),
			items:    [
				{
					key:   "name",
					value: ingredient.name,
					label: ingredient.name,
				},
				{
					key:   "amount",
					value: ingredient.amount,
					label: `${ingredient.amount} ${ingredientUnitDirectObjectShortLabels[ingredient.unit]}`,
				},
				{
					key:   "actions",
					value: ingredient.amount,
					label: (
						<Checkbox
							isChecked={ingredientsObtained.includes(ingredient.id)}
							onChange={() => {
								setIngredientsObtained(prev => {
									const nextIngredientsObtained = structuredClone(prev);

									const index = nextIngredientsObtained.indexOf(ingredient.id);

									if (index === -1) {
										nextIngredientsObtained.push(ingredient.id);
									} else {
										nextIngredientsObtained.splice(index, 1);
									}

									return nextIngredientsObtained;
								});
							}}
						/>
					),
				},
			],
		};

		return row;
	});

	return (
		<div
			className="p-4"
		>
			<Table
				columns={columns}
				rows={rows}
				sortParameters={sortParameters}
				onSort={sortParameters => setSortParameters(sortParameters)}
			/>
		</div>
	);
};