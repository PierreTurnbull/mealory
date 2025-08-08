import { useEffect, useState } from "react";
import { ingredientUnitAnnotationLabels } from "../../../utils/labels/ingredientUnits";
import { Button } from "../../common/Button/Button";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { IconButton } from "../../common/IconButton/IconButton";
import { Page } from "../../common/Page/Page";
import { Table } from "../../common/Table/Table";
import type { TSortParameters, TTableColumn, TTableRow } from "../../common/Table/table.types";
import { CreateIngredientModal } from "../../features/ingredient/CreateIngredientModal/CreateIngredientModal";
import type { TIngredient } from "../../features/ingredient/ingredient.types";
import { UpdateIngredientModal } from "../../features/ingredient/UpdateIngredientModal/UpdateIngredientModal";

export const Ingredients = () => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);
	const [ingredientToDeleteId, setIngredientToDeleteId] = useState<TIngredient["id"] | null>(null);
	const [ingredientToUpdateId, setIngredientToUpdateId] = useState<TIngredient["id"] | null>(null);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});
	const fetchIngredients = () => {
		setIngredients(
			localStorage.ingredients
				? JSON.parse(localStorage.ingredients)
				: [],
		);
	};

	const deleteIngredient = (ingredientId: TIngredient["id"]) => {
		const nextIngredients: TIngredient[] = localStorage.ingredients
			? JSON.parse(localStorage.ingredients)
			: [];
		const ingredientToDeleteIndex = nextIngredients.findIndex(ingredient => ingredient.id === ingredientId);

		nextIngredients.splice(ingredientToDeleteIndex, 1);

		localStorage.ingredients = JSON.stringify(nextIngredients);

		fetchIngredients();
	};

	useEffect(() => {
		fetchIngredients();
	}, []);

	const columns: TTableColumn[] = [
		{
			key:        "id",
			label:      "ID",
			isSortable: true,
		},
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
		},
		{
			key:   "unit",
			label: (
				<>
					<span
						className="hidden sm:inline"
					>
						Unité de mesure
					</span>
					<span
						className="sm:hidden inline"
					>
						Unité
					</span>
				</>
			),
			isSortable: true,
		},
		{
			key:   "actions",
			label: (
				<span
					className="hidden sm:inline"
				>
					Actions
				</span>
			),
			isSortable: false,
		},
	];
	const rows: TTableRow[] = ingredients.map(ingredient => {
		const tableRow: TTableRow = {
			key:   ingredient.id,
			items: [
				{
					key:   "id",
					label: ingredient.id,
					value: ingredient.id,
				},
				{
					key:   "name",
					label: ingredient.name,
					value: ingredient.name,
				},
				{
					key:   "unit",
					label: ingredientUnitAnnotationLabels[ingredient.unit],
					value: ingredient.unit,
				},
				{
					key:   "actions",
					label: (
						<div>
							<div
								className={`
									hidden
									space-x-4
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
									gap-2
									sm:hidden
								`}
							>
								<IconButton
									icon="✏️"
									onClick={() => setIngredientToUpdateId(ingredient.id)}
								/>
								<IconButton
									icon="🗑️"
									onClick={() => setIngredientToDeleteId(ingredient.id)}
									type="danger"
								/>
							</div>
						</div>
					),
					value: null,
				},
			],
		};
		return tableRow;
	});

	return (
		<Page
			title="Liste d'ingrédients"
		>
			<div className="space-y-4 flex flex-col">
				<div>
					<Button
						onClick={() => setCreateIngredientModalIsOpen(true)}
					>
						Créer un ingrédient
					</Button>
				</div>
				<Table
					columns={columns}
					rows={rows}
					sortParameters={sortParameters}
					onSort={setSortParameters}
				/>
			</div>
			{
				createIngredientModalIsOpen
					? (
						<CreateIngredientModal
							close={() => setCreateIngredientModalIsOpen(false)}
							onSubmit={fetchIngredients}
						/>
					)
					: null
			}
			{
				ingredientToUpdateId === null
					? null
					: (
						<UpdateIngredientModal
							id={ingredientToUpdateId}
							close={() => setIngredientToUpdateId(null)}
							onSubmit={fetchIngredients}
						/>
					)
			}
			{
				ingredientToDeleteId === null
					? null
					: (
						<ConfirmationModal
							title="Supprimer l'ingrédient"
							description="Es-tu sûr de vouloir supprimer l'ingrédient ?"
							cancel={() => setIngredientToDeleteId(null)}
							submit={() => {
								deleteIngredient(ingredientToDeleteId);
								setIngredientToDeleteId(null);
							}}
							buttonType="danger"
						/>
					)
			}
		</Page>
	);
};