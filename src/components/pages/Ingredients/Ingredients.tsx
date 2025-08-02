import { useEffect, useState } from "react";
import type { TTableColumn, TTableRow } from "../../../types/table.types";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { Table } from "../../common/Table/Table";
import { CreateIngredientModal } from "../../features/ingredients/CreateIngredientModal/CreateIngredientModal";
import { ingredientUnitLabels } from "../../labels/ingredientUnits";

export const Ingredients = () => {
	const [ingredients, setIngredients] = useState([]);
	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);

	const fetchIngredients = () => {
		setIngredients(
			localStorage.ingredients
				? JSON.parse(localStorage.ingredients)
				: [],
		);
	};

	useEffect(() => {
		fetchIngredients();
	}, []);

	const columns: TTableColumn[] = [
		{
			key:   "label",
			label: "Nom",
		},
		{
			key:   "unit",
			label: "Unité de mesure",
		},
	];
	const rows: TTableRow[] = ingredients.map(ingredient => {
		const tableRow: TTableRow = {
			key:   ingredient.id,
			items: [
				{
					key:   "label",
					label: ingredient.label,
					value: ingredient.label,
				},
				{
					key:   "unit",
					label: ingredientUnitLabels[ingredient.unit],
					value: ingredient.unit,
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
		</Page>
	);
};