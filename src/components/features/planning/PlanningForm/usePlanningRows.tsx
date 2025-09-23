import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Input } from "@mui/material";
import type { TTableRow } from "../../../common/Table/table.types";
import { getRecipes } from "../../recipe/recipe.api";
import type { TPlanningFormData } from "./planningFormData.types";
import type { TPlanningRowData } from "./planningRowData.types";
import type { useOnDishPortionsChange } from "./useOnDishPortionsChange";
import type { useOnMealPortionsChange } from "./useOnMealPortionsChange";

export const usePlanningRows = (
	planningFormData: TPlanningFormData,
	onDishPortionsChange: ReturnType<typeof useOnDishPortionsChange>,
	onMealPortionsChange: ReturnType<typeof useOnMealPortionsChange>,
	onRemoveDish: (id: string) => void,
	onRemoveMeal: (id: string) => void,
) => {
	const recipes = getRecipes();

	const rowDatas: TPlanningRowData[] = [
		...planningFormData.dishes.map(dishFormData => {
			const recipe = recipes.find(recipe => recipe.id === dishFormData.recipeId);

			if (!recipe) {
				throw new Error(`La recette ${dishFormData.recipeId} n'existe plus.`);
			}

			const rowData: TPlanningRowData = {
				id:               dishFormData.id,
				name:             recipe.name,
				portionsFormData: dishFormData.portions,
				type:             "dish",
				onRemove:         () => onRemoveDish(dishFormData.id),
			};

			return rowData;
		}),
		...planningFormData.meals.map(mealFormData => {
			const recipeIds = mealFormData.dishes.map(dishFormData => dishFormData.recipeId);

			const usedRecipes = recipes.filter(recipe => recipeIds.includes(recipe.id));

			if (usedRecipes.length !== recipeIds.length) {
				throw new Error(`Parmis ${recipeIds.join(", ")}, certaines recettes n'existent plus. Les recettes suivantes ont été trouvées : ${usedRecipes.join(", ")}.`);
			}

			const rowData: TPlanningRowData = {
				id:               mealFormData.id,
				name:             usedRecipes.map(recipe => recipe.name).join(", "),
				portionsFormData: mealFormData.portions,
				type:             "meal",
				onRemove:         () => onRemoveMeal(mealFormData.id),
			};

			return rowData;
		}),
	];

	const planningRows = rowDatas.map(rowData => {
		const planningRow: TTableRow = {
			key:   rowData.id,
			items: [
				{
					key:   "name",
					label: rowData.name,
					value: rowData.name,
				},
				{
					key:   "portions",
					label: (
						<div className="flex justify-center">
							<Input
								value={rowData.portionsFormData.value}
								onChange={(event) => {
									if (rowData.type === "dish") {
										onDishPortionsChange(event, rowData.id);
									} else if (rowData.type === "meal") {
										onMealPortionsChange(event, rowData.id);
									} else {
										throw new Error(`Unsupported planning row type: ${rowData.type}.`);
									}
								}}
								type="number"
							/>
						</div>
					),
					value:             rowData.name,
					paddingIsDisabled: true,
				},
				{
					key:   "actions",
					label: (
						<IconButton
							color="error"
							onClick={rowData.onRemove}
						>
							<DeleteIcon />
						</IconButton>
					),
					value: "",
				},
			],
		};

		return planningRow;
	});

	return planningRows;
};