import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ingredientUnitDirectObjectLabels } from "../../../utils/labels/ingredientUnits";
import { Button } from "../../common/Button/Button";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Page } from "../../common/Page/Page";
import { Section } from "../../common/Section/Section";
import { Title } from "../../common/Title/Title";
import { DefaultIngredient } from "../../features/ingredient/DefaultIngredient";
import type { TIngredient } from "../../features/ingredient/ingredient.types";
import type { TRecipe, TRecipeIngredient } from "../../features/recipe/recipe.types";
import { UpdateRecipeModal } from "../../features/recipe/UpdateRecipeModal/UpdateRecipeModal";

export const Recipe = () => {
	const navigate = useNavigate();
	const params = useParams();
	const recipeId = params.recipeId && Number(params.recipeId);

	if (!recipeId) {
		throw new Error("Missing recipeId.");
	}

	const [updateRecipeModalIsOpen, setUpdateRecipeModalIsOpen] = useState(false);
	const [deleteRecipeModalIsOpen, setDeleteRecipeModalIsOpen] = useState(false);

	const ingredients: TIngredient[] = localStorage.ingredients
		? JSON.parse(localStorage.ingredients)
		: [];

	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes)
		: [];
	const recipe = recipes.find(recipe => recipe.id === Number(recipeId));

	if (!recipe) {
		throw new Error(`Missing recipe with id ${recipeId}.`);
	}

	const deleteRecipe = () => {
		const nextRecipes: TRecipe[] = localStorage.recipes
			? JSON.parse(localStorage.recipes)
			: [];
		const recipeToDeleteIndex = nextRecipes.findIndex(recipe => recipe.id === recipeId);

		nextRecipes.splice(recipeToDeleteIndex, 1);

		localStorage.recipes = JSON.stringify(nextRecipes);
	};

	return (
		<Page
			title={recipe.name}
			mustDisplayGoBackButton={true}
		>
			<div
				className="space-y-4"
			>
				<div className="flex space-x-2">
					<Button
						onClick={() => setUpdateRecipeModalIsOpen(true)}
					>
						Modifier
					</Button>
					<Button
						type="danger"
						onClick={() => setDeleteRecipeModalIsOpen(true)}
					>
						Supprimer
					</Button>
				</div>
				<div
					className="space-x-4 grid grid-cols-2"
				>
					<Section>
						<div className="space-y-4 flex flex-col justify-between h-full">
							<div className="space-y-4">
								<Title rank="h4" title="Description :" />
								<p>{recipe.description}</p>
							</div>
							<div className="space-y-4">
								<Title rank="h4" title="Liste d'ingrédients :" className="hidden sm:block" />
								<Title rank="h4" title="Ingrédients :" className="sm:hidden block" />
								{
									recipe.ingredients
										.map(recipeIngredient => {
											const ingredient = ingredients.find(ingredient => ingredient.id === recipeIngredient.id);

											if (!ingredient) {
												return (
													<p key={recipeIngredient.id}>
														Oups ! L'ingrédient avec l'ID {recipeIngredient.id} n'existe plus :(
													</p>
												);
											}

											const fullIngredient: TIngredient & TRecipeIngredient = {
												...ingredient,
												...recipeIngredient,
											};
											return (
												<p key={recipeIngredient.id}>
													{fullIngredient.name} : {fullIngredient.amount} {ingredientUnitDirectObjectLabels[fullIngredient.aliasUnit || fullIngredient.unit]}
												</p>
											);
										})
								}
							</div>
						</div>
					</Section>
					{
						recipe.imageUrl
							? (
								<Section>
									<div className="flex justify-center items-center h-full w-full">
										<img
											className="rounded"
											src={recipe.imageUrl}
											alt={`Recette : ${recipe.name}.`}
										/>
									</div>
								</Section>
							)
							: (
								<Section>
									<div className="p-16 h-full w-full flex">
										<DefaultIngredient />
									</div>
								</Section>
							)
					}
				</div>
				<Section>
					<Title rank="h4" title="Instructions :" />
					<ul className="space-y-4">
						{
							recipe.instructions.map((instruction, key) => {
								return (
									<li
										key={key}
										className="space-x-2"
									>
										<span>{key}.</span>
										<span>{instruction}</span>
									</li>
								);
							})
						}
					</ul>
				</Section>
			</div>
			{
				deleteRecipeModalIsOpen
					? (
						<ConfirmationModal
							title="Supprimer la recette"
							description="Es-tu sûr de vouloir supprimer la recette ?"
							cancel={() => setDeleteRecipeModalIsOpen(false)}
							submit={() => {
								deleteRecipe();
								navigate("/recipes");
							}}
							buttonType="danger"
						/>
					)
					: null
			}
			{
				updateRecipeModalIsOpen
					? (
						<UpdateRecipeModal
							close={() => setUpdateRecipeModalIsOpen(false)}
							id={recipeId}
						/>
					)
					: null
			}
		</Page>
	);
};