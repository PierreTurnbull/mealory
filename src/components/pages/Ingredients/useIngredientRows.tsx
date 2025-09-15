import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { ingredientUnitAnnotationLabels } from "../../../utils/labels/ingredientUnits";
import type { TTableRow } from "../../common/Table/table.types";
import { defaultIngredients } from "../../features/ingredient/defaultIngredients/defaultIngredients";
import type { TIngredient } from "../../features/ingredient/ingredient.types";

export const useIngredientRows = (
	ingredients: TIngredient[],
	setIngredientToUpdateId: React.Dispatch<React.SetStateAction<string | null>>,
	setIngredientToDeleteId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
	const rows: TTableRow[] = ingredients.map(ingredient => {
		const isDefaultIngredient = Boolean(defaultIngredients.find(defaultIngredient => defaultIngredient.id === ingredient.id));

		const tableRow: TTableRow = {
			key:   ingredient.id,
			items: [
				{
					key:   "name",
					label: ingredient.name,
					value: ingredient.name,
				},
				{
					key:   "referenceUnit",
					label: ingredientUnitAnnotationLabels[ingredient.referenceUnit],
					value: ingredient.referenceUnit,
				},
				{
					key:   "actions",
					label: (
						<div
							className={`
									flex
									gap-1
								`}
						>
							<IconButton
								onClick={() => setIngredientToUpdateId(ingredient.id)}
							>
								<EditIcon />
							</IconButton>
							{
								isDefaultIngredient
									? null
									: (
										<IconButton
											onClick={() => setIngredientToDeleteId(ingredient.id)}
											color="error"
										>
											<DeleteIcon />
										</IconButton>
									)
							}
						</div>
					),
					value: null,
				},
			],
		};
		return tableRow;
	});

	return rows;
};