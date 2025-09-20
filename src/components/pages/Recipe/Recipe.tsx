import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../common/Button/Button";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Page } from "../../common/Page/Page";
import { Section } from "../../common/Section/Section";
import { Title } from "../../common/Title/Title";
import { getIngredientsWithDefaults } from "../../features/ingredient/defaultIngredients/getIngredientsWithDefaults";
import { ingredientUnitTypesConfig } from "../../features/ingredient/ingredientUnits.model";
import { deleteRecipe, getRecipes } from "../../features/recipe/recipe.api";
import { UpdateRecipeModal } from "../../features/recipe/UpdateRecipeModal/UpdateRecipeModal";

export const Recipe = () => {
	const navigate = useNavigate();
	const params = useParams();
	const recipeId = params.recipeId;

	if (!recipeId) {
		throw new Error("Missing recipeId.");
	}

	const [updateRecipeModalIsOpen, setUpdateRecipeModalIsOpen] = useState(false);
	const [deleteRecipeModalIsOpen, setDeleteRecipeModalIsOpen] = useState(false);

	const [ingredients, setIngredients] = useState(getIngredientsWithDefaults());
	const [recipes, setRecipes] = useState(getRecipes());

	const recipe = recipes.find(recipe => recipe.id === recipeId);

	if (!recipe) {
		throw new Error(`Missing recipe with id ${recipeId}.`);
	}

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
					className="flex flex-col min-[500px]:grid min-[500px]:grid-cols-2 gap-4"
				>
					<Section
						className={`
							order-1
							min-[500px]:order-0
							${recipe.imageUrl ? "" : "col-span-2"}
						`}
					>
						<div className={`
							space-y-4
							flex
							flex-col
							justify-between
							h-full
						`}>
							{
								recipe.description
									? (
										<div className="space-y-4">
											<Title rank="h4" title="Description :" />
											<p>{recipe.description}</p>
										</div>
									)
									: null
							}
							<div className="space-y-2">
								<Title rank="h4" title="Ingrédients :" />
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

											const matchingUnitType = Object.entries(ingredientUnitTypesConfig)
												.find(entry => {
													const unitMatchesUnitType = Object.keys(entry[1].units).includes(recipeIngredient.unit);

													return unitMatchesUnitType;
												})?.[1];
											const unitConfig = matchingUnitType && Object.entries(matchingUnitType.units)
												.find(entry => entry[0] === recipeIngredient.unit)?.[1];
											const unitLabel = unitConfig?.[recipeIngredient.amount >= 2 ? "labelPlural" : "label"]
												.toLowerCase();

											return (
												<p key={recipeIngredient.id}>
													{ingredient.name} : {recipeIngredient.amount} {unitLabel}
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
									<div className="flex justify-center items-center h-full w-full order-0">
										<img
											className="rounded"
											src={recipe.imageUrl}
											alt={`Recette : ${recipe.name}.`}
										/>
									</div>
								</Section>
							)
							: null
					}
				</div>
				{
					recipe.instructions
						? (
							<Section>
								<Title rank="h4" title="Instructions :" />
								<ul className="space-y-2">
									{
										recipe.instructions.map((instruction, key) => {
											return (
												<li
													key={key}
													className="space-x-2"
												>
													<span>{key + 1}.</span>
													<span>{instruction}</span>
												</li>
											);
										})
									}
								</ul>
							</Section>
						)
						: null
				}
			</div>
			{
				deleteRecipeModalIsOpen
					? (
						<ConfirmationModal
							title="Supprimer la recette"
							description="Es-tu sûr de vouloir supprimer la recette ?"
							cancel={() => setDeleteRecipeModalIsOpen(false)}
							submit={() => {
								deleteRecipe(recipeId);
								navigate("/recipes");
							}}
							color="error"
						/>
					)
					: null
			}
			{
				updateRecipeModalIsOpen
					? (
						<UpdateRecipeModal
							close={() => {
								setUpdateRecipeModalIsOpen(false);
								setRecipes(getRecipes());
							}}
							id={recipeId}
							onSubmit={() => {
								setIngredients(getIngredientsWithDefaults());
							}}
						/>
					)
					: null
			}
		</Page>
	);
};