import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { RecipeForm } from "../RecipeForm/RecipeForm";
import { createRecipe } from "../recipe.api";
import type { TRecipe } from "../recipe.types";

type TCreateRecipeModalProps = {
	close:     () => void
	onSubmit?: (recipeId: TRecipe["id"]) => void
}

export const CreateRecipeModal = ({
	close,
	onSubmit,
}: TCreateRecipeModalProps) => {
	const [recipe, setRecipe] = useState<Omit<TRecipe, "id">>({
		name:         "",
		description:  null,
		imageUrl:     null,
		ingredients:  [],
		instructions: null,
	});

	const submit = () => {
		console.log("s");
		const createdRecipe = createRecipe(recipe);
		onSubmit?.(createdRecipe.id);
	};

	return (
		<Modal
			close={close}
			title="Créer une recette"
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