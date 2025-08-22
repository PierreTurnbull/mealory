import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { RecipeForm } from "../RecipeForm/RecipeForm";
import { getRecipe } from "../recipe.api";
import type { TRecipe } from "../recipe.types";

type TUpdateRecipeModalProps = {
	close:     () => void
	onSubmit?: () => void
	id:        TRecipe["id"]
}

export const UpdateRecipeModal = ({
	close,
	onSubmit,
	id,
}: TUpdateRecipeModalProps) => {
	const initialRecipe = getRecipe(id);

	if (!initialRecipe) {
		throw new Error(`Missing recipe with id ${id}.`);
	}
	
	const [recipe, setRecipe] = useState<TRecipe>(initialRecipe);

	const submit = () => {
		localStorage.recipes = JSON.stringify(initialRecipe);
		onSubmit?.();
	};

	return (
		<Modal
			close={close}
			title="Modifier une recette"
		>
			<RecipeForm
				recipe={recipe}
				setRecipe={setRecipe}
				submit={submit}
				close={close}
			/>
		</Modal>
	);
};