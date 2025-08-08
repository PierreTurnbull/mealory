import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { RecipeForm } from "../RecipeForm/RecipeForm";
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
	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes)
		: [];
	const recipe = recipes.find(recipe => recipe.id === id);

	if (!recipe) {
		throw new Error(`Missing recipe with id ${id}.`);
	}

	const [name, setName] = useState<TRecipe["name"]>(recipe.name);
	const [description, setDescription] = useState<TRecipe["description"]>(recipe.description);
	const [imageUrl, setImageUrl] = useState<TRecipe["imageUrl"]>(recipe.imageUrl);
	const [ingredients, setIngredients] = useState<TRecipe["ingredients"]>(recipe.ingredients);
	const [instructions, setInstructions] = useState<TRecipe["instructions"]>(recipe.instructions);

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
		const recipeToUpdate = nextRecipes.find(nextRecipe => nextRecipe.id === id);

		if (!recipeToUpdate) {
			throw new Error(`Missing recipe with id ${id}.`);
		}

		recipeToUpdate.name = name;
		recipeToUpdate.description = description;
		recipeToUpdate.imageUrl = imageUrl;
		recipeToUpdate.ingredients = ingredients;
		recipeToUpdate.instructions = instructions;

		localStorage.recipes = JSON.stringify(nextRecipes);

		onSubmit?.();
	};

	return (
		<Modal
			close={close}
			title="Modifier une recette"
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