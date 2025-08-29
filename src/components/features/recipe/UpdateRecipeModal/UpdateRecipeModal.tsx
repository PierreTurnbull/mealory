import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { RecipeForm } from "../RecipeForm/RecipeForm";
import { getRecipe, updateRecipe } from "../recipe.api";
import type { TRecipe } from "../recipe.types";

type TUpdateRecipeModalProps = {
	id:        TRecipe["id"]
	close:     () => void
	onSubmit?: (updatedRecipe: TRecipe) => void
}

export const UpdateRecipeModal = ({
	id,
	close,
	onSubmit,
}: TUpdateRecipeModalProps) => {
	const initialRecipe = getRecipe(id);

	if (!initialRecipe) {
		throw new Error(`Missing recipe with id ${id}.`);
	}
	
	const [recipe, setRecipe] = useState<TRecipe>(initialRecipe);

	const submit = () => {
		const updatedRecipe = updateRecipe(id, recipe);
		onSubmit?.(updatedRecipe);
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