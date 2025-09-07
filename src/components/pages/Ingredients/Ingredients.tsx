import { useCallback, useState } from "react";
import { dbClient } from "../../../dbClient/dbClient";
import { useOnMount } from "../../../utils/useOnMount/useOnMount";
import { Button } from "../../common/Button/Button";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Page } from "../../common/Page/Page";
import { Table } from "../../common/Table/Table";
import type { TSortParameters } from "../../common/Table/table.types";
import { CreateIngredientModal } from "../../features/ingredient/CreateIngredientModal/CreateIngredientModal";
import { deleteIngredient } from "../../features/ingredient/ingredient.api";
import type { TIngredient, TIngredientUnit, TReferenceIngredientUnit } from "../../features/ingredient/ingredient.types";
import { useIngredientsContext } from "../../features/ingredient/ingredientsContext/useIngredientsContext";
import { referenceUnits, units } from "../../features/ingredient/units";
import { UpdateIngredientModal } from "../../features/ingredient/UpdateIngredientModal/UpdateIngredientModal";
import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";
import { useIngredientColumns } from "./useIngredientColumns";
import { useIngredientRows } from "./useIngredientRows";

export const Ingredients = () => {
	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);
	const [ingredientToDeleteId, setIngredientToDeleteId] = useState<TIngredient["id"] | null>(null);
	const [ingredientToUpdateId, setIngredientToUpdateId] = useState<TIngredient["id"] | null>(null);

	const ingredientsContext = useIngredientsContext();

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});

	const columns = useIngredientColumns();
	const rows = useIngredientRows(
		ingredientsContext.ingredients,
		setIngredientToUpdateId,
		setIngredientToDeleteId,
	);

	return (
		<Page
			title="Liste d'ingrédients"
			isLoading={ingredientsContext.isLoading}
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
							submit={async () => {
								deleteIngredient(ingredientToDeleteId);
								await fetchIngredients();
								setIngredientToDeleteId(null);
							}}
							color="error"
						/>
					)
			}
		</Page>
	);
};