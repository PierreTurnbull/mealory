import { useEffect, useState } from "react";
import { Button } from "../../common/Button/Button";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Page } from "../../common/Page/Page";
import { Table } from "../../common/Table/Table";
import type { TSortParameters } from "../../common/Table/table.types";
import { CreateIngredientModal } from "../../features/ingredient/CreateIngredientModal/CreateIngredientModal";
import { deleteIngredient, getIngredients } from "../../features/ingredient/ingredient.api";
import type { TIngredient } from "../../features/ingredient/ingredient.types";
import { UpdateIngredientModal } from "../../features/ingredient/UpdateIngredientModal/UpdateIngredientModal";
import { useIngredientColumns } from "./useIngredientColumns";
import { useIngredientRows } from "./useIngredientRows";

export const Ingredients = () => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);
	const [ingredientToDeleteId, setIngredientToDeleteId] = useState<TIngredient["id"] | null>(null);
	const [ingredientToUpdateId, setIngredientToUpdateId] = useState<TIngredient["id"] | null>(null);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});

	useEffect(() => {
		setIngredients(getIngredients());
	}, []);

	const columns = useIngredientColumns();
	const rows = useIngredientRows(
		ingredients,
		setIngredientToUpdateId,
		setIngredientToDeleteId,
	);

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
							onSubmit={() => setIngredients(getIngredients())}
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
							onSubmit={() => setIngredients(getIngredients())}
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
								setIngredients(getIngredients());
								setIngredientToDeleteId(null);
							}}
							color="error"
						/>
					)
			}
		</Page>
	);
};