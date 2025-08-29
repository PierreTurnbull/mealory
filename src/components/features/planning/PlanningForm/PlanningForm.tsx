import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import type { TFormData } from "../../../../types/form/formData.types";
import { ConfirmationModal } from "../../../common/ConfirmationModal/ConfirmationModal";
import { HelperIcon } from "../../../common/HelperIcon/HelperIcon";
import { Table } from "../../../common/Table/Table";
import type { TSortParameters } from "../../../common/Table/table.types";
import type { TPlanning } from "../planning.types";
import { AddRecipeModal } from "./AddRecipeModal/AddRecipeModal";
import { useOnAddRecipe } from "./useOnAddRecipe";
import { useOnPortionsChange } from "./useOnPortionsChange";
import { useOnRemoveRecipe } from "./useOnRemoveRecipe";
import { useOnResetPlanning } from "./useOnResetPlanning";
import { usePlanningFormData } from "./usePlanningFormData";
import { useRecipeColumns } from "./useRecipeColumns";
import { useRecipeRows } from "./useRecipeRows";
import { useSyncPlanningFormDataAndPlanning } from "./useSyncPlanningFormDataAndPlanning";

type TPlanningFormProps<T> = {
	planning:    T
	setPlanning: React.Dispatch<React.SetStateAction<T>>
}

export const PlanningForm = <T extends TPlanning | Omit<TPlanning, "id">>({
	planning,
	setPlanning,
}: TPlanningFormProps<T>) => {
	const [defaultPortions, setDefaultPortions] = useState<number>(localStorage.defaultPortions || 1);

	const [defaultPortionsFormData, setDefaultPortionsFormData] = useState<TFormData<string>>({ value: String(defaultPortions) });

	useEffect(() => {
		setDefaultPortions(Number(defaultPortionsFormData.value));
	}, [defaultPortionsFormData]);

	useEffect(() => {
		localStorage.setItem("defaultPortions", JSON.stringify(defaultPortions));
	}, [defaultPortions]);

	const [addRecipeModalIsOpen, setAddRecipeModalIsOpen] = useState(false);
	const [confirmResetModalIsOpen, setConfirmResetModalIsOpen] = useState(false);

	const [planningFormData, setPlanningFormData] = usePlanningFormData(planning);

	const onResetPlanning = useOnResetPlanning(setPlanningFormData, setConfirmResetModalIsOpen);
	const onAddRecipe = useOnAddRecipe(setPlanningFormData, setAddRecipeModalIsOpen, defaultPortions);
	const onRemoveRecipe = useOnRemoveRecipe(setPlanningFormData);
	const onPortionsChange = useOnPortionsChange(setPlanningFormData);

	useSyncPlanningFormDataAndPlanning(planningFormData, setPlanning);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});

	const recipeColumns = useRecipeColumns();
	const recipeRows = useRecipeRows(planningFormData, onPortionsChange, onRemoveRecipe);

	return (
		<div className="space-y-4">
			<div className="space-y-4 flex flex-col items-center">
				<div className="flex gap-2">
					<Button
						onClick={() => setAddRecipeModalIsOpen(true)}
					>
						Ajouter une recette
					</Button>
					<Button
						color="error"
						onClick={() => setConfirmResetModalIsOpen(true)}
					>
						Réinitialiser
					</Button>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<p>Portions par défaut :</p>
				<HelperIcon
					text={`Le nombre de portions affecte la quantité des ingrédients requis pour faire la recette. Par défaut, les recettes sont ajoutées au planning avec ${defaultPortions} portions, mais vous pouvez changer cette valeur.`}
				/>
				<Input
					style={{
						width: 40,
					}}
					value={defaultPortionsFormData.value}
					onChange={event => setDefaultPortionsFormData({ value: event.target.value })}
					type="number"
				/>
			</div>
			<div className="fixed bottom-16 right-4 shadow">
				<IconButton
					size="large"
					onClick={() => setAddRecipeModalIsOpen(true)}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Table
				fullWidth
				columns={recipeColumns}
				rows={recipeRows}
				sortParameters={sortParameters}
				onSort={setSortParameters}
			/>
	 		{
	 			confirmResetModalIsOpen
	 				? (
	 					<ConfirmationModal
	 						cancel={() => setConfirmResetModalIsOpen(false)}
	 						description="Es-tu sûr de vouloir réinitialiser le planning ? Cela signifie que plus aucune recette ne sera sélectionnée."
	 						title="Réinitialiser le planning"
	 						submit={onResetPlanning}
	 						color="error"
	 					/>
	 				)
	 				: null
	 		}
			{
				addRecipeModalIsOpen
					? (
						<AddRecipeModal
							selectedRecipeIds={planningFormData.recipes}
							close={() => setAddRecipeModalIsOpen(false)}
							selectRecipe={onAddRecipe}
						/>
					)
					: null
			}
		</div>
	);
};