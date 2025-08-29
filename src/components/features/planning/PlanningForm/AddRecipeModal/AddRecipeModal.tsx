import { Input } from "@mui/material";
import { useState } from "react";
import { Modal } from "../../../../common/Modal/Modal";
import { DefaultRecipeImage } from "../../../ingredient/DefaultRecipeImage/DefaultRecipeImage";
import { getRecipes } from "../../../recipe/recipe.api";
import type { TRecipe } from "../../../recipe/recipe.types";
import type { TPlanningRecipeFormData } from "../planningFormData.types";

type TAddRecipeModalProps = {
	selectRecipe:      (id: TRecipe["id"]) => void
	selectedRecipeIds: TPlanningRecipeFormData[]
	close:             () => void
}

export const AddRecipeModal = ({
	selectRecipe,
	selectedRecipeIds,
	close,
}: TAddRecipeModalProps) => {
	const recipes = getRecipes();

	const [search, setSearch] = useState("");

	const filteredRecipes = recipes
		.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
		.filter(recipe => !selectedRecipeIds.map(selectedRecipeId => selectedRecipeId.id).includes(recipe.id));

	return (
		<Modal
			title="Sélectionner une recette"
			close={close}
		>
			<div className="space-y-4">
				<Input
					fullWidth
					value={search}
					onChange={event => setSearch(event.target.value)}
					placeholder="Chercher une recette"
				/>
				<div className="grid grid-cols-3 gap-4">
					{
						filteredRecipes.map(recipe => {
							return (
								<div
									key={recipe.id}
									className="space-y-2"
									onClick={() => {
										selectRecipe(recipe.id);
									}}
								>
									<p className="text-center">{recipe.name}</p>
									{
										recipe.imageUrl
											? (
												<img
													className="aspect-square object-cover rounded"
													alt={recipe.name}
													src={recipe.imageUrl}
												/>
											)
											: <DefaultRecipeImage />
									}
								</div>
							);
						})
					}
				</div>
			</div>
		</Modal>
	);
};