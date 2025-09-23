import { Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { Modal } from "../../../../common/Modal/Modal";
import { getRecipes } from "../../../recipe/recipe.api";
import type { TRecipe } from "../../../recipe/recipe.types";

type TAddMealModalProps = {
	close:     () => void
	onAddMeal: (recipeIds: TRecipe["id"][]) => void
}

export const AddMealModal = ({
	close,
	onAddMeal,
}: TAddMealModalProps) => {
	const recipes = getRecipes();

	const [recipeIds, setRecipeIds] = useState<TRecipe["id"][]>([]);

	const handleToggle = (recipeId: TRecipe["id"]) => () => {
		const currentIndex = recipeIds.indexOf(recipeId);
		const nextRecipeIds = [...recipeIds];

		if (currentIndex === -1) {
			nextRecipeIds.push(recipeId);
		} else {
			nextRecipeIds.splice(currentIndex, 1);
		}

		setRecipeIds(nextRecipeIds);
	};

	return (
		<Modal
			title="Composer un repas"
			close={close}
		>
			<div className="flex flex-col items-center">

				<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
					{
						recipes.map((recipe) => {
							return (
								<ListItem
									key={recipe.id}
									disablePadding
								>
									<ListItemButton role={undefined} onClick={handleToggle(recipe.id)} dense>
										<ListItemIcon>
											<Checkbox
												edge="start"
												checked={recipeIds.includes(recipe.id)}
												tabIndex={-1}
												disableRipple
											/>
										</ListItemIcon>
										<ListItemText id={recipe.id} primary={recipe.name} />
									</ListItemButton>
								</ListItem>
							);
						})
					}
				</List>
				<Button
					onClick={() => {
						onAddMeal(recipeIds);
						close();
					}}
				>
					Ajouter le repas
				</Button>
			</div>
		</Modal>
	);
};