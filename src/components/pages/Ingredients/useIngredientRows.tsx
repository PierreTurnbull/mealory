import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { ingredientUnitAnnotationLabels } from "../../../utils/labels/ingredientUnits";
import { Button } from "../../common/Button/Button";
import type { TTableRow } from "../../common/Table/table.types";
import type { TIngredient } from "../../features/ingredient/ingredient.types";

export const useIngredientRows = (
	ingredients: TIngredient[],
	setIngredientToUpdateId: React.Dispatch<React.SetStateAction<number | null>>,
	setIngredientToDeleteId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
	const rows: TTableRow[] = ingredients.map(ingredient => {
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
						<div>
							<div
								className={`
									hidden
									space-x-1
									sm:flex
								`}
							>
								<Button
									onClick={() => setIngredientToUpdateId(ingredient.id)}
									size="sm"
								>
									Modifier
								</Button>
								<Button
									onClick={() => setIngredientToDeleteId(ingredient.id)}
									size="sm"
									type="danger"
								>
									Supprimer
								</Button>
							</div>
							<div
								className={`
									flex
									gap-1
									sm:hidden
								`}
							>
								<IconButton
									onClick={() => setIngredientToUpdateId(ingredient.id)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									onClick={() => setIngredientToDeleteId(ingredient.id)}
									color="error"
								>
									<DeleteIcon />
								</IconButton>
							</div>
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