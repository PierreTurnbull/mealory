import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Input } from "@mui/material";
import type { TTableRow } from "../../../common/Table/table.types";
import { getRecipes } from "../../recipe/recipe.api";
import type { TPlanningFormData } from "./planningFormData.types";

export const useRecipeRows = (
	planningFormData: TPlanningFormData,
	onPortionsChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: number) => void,
	onRemoveRecipe: (key: number) => void,
) => {
	const recipes = getRecipes();

	const recipeRows = planningFormData.recipes.map((recipeFormData, key) => {
		const recipe = recipes.find(recipe => recipe.id === recipeFormData.id);

		if (!recipe) {
			throw new Error(`La recette ${recipeFormData.id} n'existe plus.`);
		}

		const recipeRow: TTableRow = {
			key:   recipe.id,
			items: [
				{
					key:   "name",
					label: recipe.name,
					value: recipe.name,
				},
				{
					key:   "portions",
					label: (
						<div className="flex justify-center">
							<Input
								value={recipeFormData.portions.value}
								onChange={(event) => onPortionsChange(event, key)}
								type="number"
							/>
						</div>
					),
					value:             recipe.name,
					paddingIsDisabled: true,
				},
				{
					key:   "actions",
					label: (
						<IconButton
							color="error"
							onClick={() => onRemoveRecipe(key)}
						>
							<DeleteIcon />
						</IconButton>
					),
					value: "",
				},
			],
		};

		return recipeRow;
	});

	return recipeRows;
};