import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../../../db/db.model";
import type { TFormData } from "../../../../types/form/formData.types";
import { ConfirmationModal } from "../../../common/ConfirmationModal/ConfirmationModal";
import { HelperIcon } from "../../../common/HelperIcon/HelperIcon";
import { Table } from "../../../common/Table/Table";
import type { TSortParameters } from "../../../common/Table/table.types";
import type { TPlanning } from "../planning.types";
import { AddDishModal } from "./AddDishModal/AddDishModal";
import { AddMealModal } from "./AddMealModal/AddMealModal";
import { useOnAddDish } from "./useOnAddDish";
import { useOnAddMeal } from "./useOnAddMeal";
import { useOnDishPortionsChange } from "./useOnDishPortionsChange";
import { useOnMealPortionsChange } from "./useOnMealPortionsChange";
import { useOnRemoveDish } from "./useOnRemoveDish";
import { useOnRemoveMeal } from "./useOnRemoveMeal";
import { useOnResetPlanning } from "./useOnResetPlanning";
import { usePlanningColumns } from "./usePlanningColumns";
import { usePlanningFormData } from "./usePlanningFormData";
import { usePlanningRows } from "./usePlanningRows";
import { useSyncPlanningFormDataAndPlanning } from "./useSyncPlanningFormDataAndPlanning";

type TPlanningFormProps<T> = {
	planning:    T
	setPlanning: React.Dispatch<React.SetStateAction<T>>
}

export const PlanningForm = <T extends TPlanning | Omit<TPlanning, "id">>({
	planning,
	setPlanning,
}: TPlanningFormProps<T>) => {
	const [defaultPortions, setDefaultPortions] = useState<number>(Number(db.getItem("defaultPortions")) || 1);

	const [defaultPortionsFormData, setDefaultPortionsFormData] = useState<TFormData<string>>({ value: String(defaultPortions) });

	useEffect(() => {
		setDefaultPortions(Number(defaultPortionsFormData.value));
	}, [defaultPortionsFormData]);

	useEffect(() => {
		db.setItem("defaultPortions", JSON.stringify(defaultPortions));
	}, [defaultPortions]);

	const [addDishModalIsOpen, setAddDishModalIsOpen] = useState(false);
	const [addMealModalIsOpen, setAddMealModalIsOpen] = useState(false);
	const [confirmResetModalIsOpen, setConfirmResetModalIsOpen] = useState(false);

	const [planningFormData, setPlanningFormData] = usePlanningFormData(planning);

	const onResetPlanning = useOnResetPlanning(setPlanningFormData, setConfirmResetModalIsOpen);
	const onAddDish = useOnAddDish(setPlanningFormData, setAddDishModalIsOpen, defaultPortions);
	const onAddMeal = useOnAddMeal(setPlanningFormData, setAddDishModalIsOpen, defaultPortions);
	const onRemoveDish = useOnRemoveDish(setPlanningFormData);
	const onRemoveMeal = useOnRemoveMeal(setPlanningFormData);
	const onDishPortionsChange = useOnDishPortionsChange(setPlanningFormData);
	const onMealPortionsChange = useOnMealPortionsChange(setPlanningFormData);

	useSyncPlanningFormDataAndPlanning(planningFormData, setPlanning);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});

	const planningColumns = usePlanningColumns();
	const planningRows = usePlanningRows(
		planningFormData,
		onDishPortionsChange,
		onMealPortionsChange,
		onRemoveDish,
		onRemoveMeal,
	);

	return (
		<div className="space-y-4">
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
			<p>Vous pouvez ajouter à votre planning des plats seuls. Vous pouvez aussi ajouter des plats groupés en repas (ex : entrée + plat).</p>
			<div className="space-y-4 flex flex-col items-center">
				<div className="flex gap-2 items-center">
					<div className="flex flex-col gap-2">
						<Button
							onClick={() => setAddMealModalIsOpen(true)}
						>
							Ajouter un repas
						</Button>
						<Button
							onClick={() => setAddDishModalIsOpen(true)}
						>
							Ajouter une recette seule
						</Button>
					</div>
					<div>
						<Button
							color="error"
							onClick={() => setConfirmResetModalIsOpen(true)}
						>
							Réinitialiser
						</Button>
					</div>
				</div>
			</div>
			<div className="fixed bottom-16 right-4 shadow">
				<IconButton
					size="large"
					onClick={() => setAddDishModalIsOpen(true)}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Table
				fullWidth
				columns={planningColumns}
				rows={planningRows}
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
				addDishModalIsOpen
					? (
						<AddDishModal
							selectedDishFormDatas={planningFormData.dishes}
							close={() => setAddDishModalIsOpen(false)}
							selectRecipe={onAddDish}
						/>
					)
					: null
			}
			{
				addMealModalIsOpen
					? (
						<AddMealModal
							close={() => setAddMealModalIsOpen(false)}
							onAddMeal={onAddMeal}
						/>
					)
					: null
			}
		</div>
	);
};