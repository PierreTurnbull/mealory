import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { RecipeForm } from "../RecipeForm/RecipeForm";
import type { TRecipe } from "../recipe.types";

type TCreateRecipeModalProps = {
	close:     () => void
	onSubmit?: (recipeId: number) => void
}

export const CreateRecipeModal = ({
	close,
	onSubmit,
}: TCreateRecipeModalProps) => {
	const [name, setName] = useState<TRecipe["name"]>("");
	const [description, setDescription] = useState<TRecipe["description"]>("");
	const [imageUrl, setImageUrl] = useState<TRecipe["imageUrl"]>("");
	const [ingredients, setIngredients] = useState<TRecipe["ingredients"]>([]);
	const [instructions, setInstructions] = useState<TRecipe["instructions"]>([]);

	const submit = (
		name: TRecipe["name"],
		description: TRecipe["description"],
		imageUrl: TRecipe["imageUrl"],
		ingredients: TRecipe["ingredients"],
		instructions: TRecipe["instructions"],
	) => {
		const nextRecipes: TRecipe[] = localStorage.recipes
			? JSON.parse(localStorage.recipes)
			: [];
		const nextRecipe: TRecipe = {
			id:           (nextRecipes.at(-1)?.id || 0) + 1,
			name:         name,
			description:  description,
			imageUrl:     imageUrl,
			ingredients:  ingredients,
			instructions: instructions,
		};

		nextRecipes.push(nextRecipe);

		localStorage.recipes = JSON.stringify(nextRecipes);

		onSubmit?.(nextRecipe.id);
	};

	return (
		<Modal
			close={close}
			title="Créer une recette"
		>
			<RecipeForm
				name={name}
				description={description}
				imageUrl={imageUrl}
				ingredients={ingredients}
				instructions={instructions}
				setName={setName}
				setDescription={setDescription}
				setImageUrl={setImageUrl}
				setIngredients={setIngredients}
				setInstructions={setInstructions}
				submit={submit}
				close={close}
			/>
		</Modal>
	);
};