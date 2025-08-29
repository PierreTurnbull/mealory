import { Input } from "@mui/material";
import { useState } from "react";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { CreateRecipeModal } from "../../features/recipe/CreateRecipeModal/CreateRecipeModal";
import { getRecipes } from "../../features/recipe/recipe.api";
import { RecipeThumbnail } from "../../features/recipe/RecipeThumbnail/RecipeThumbnail";

export const Recipes = () => {
	const [recipes, setRecipes] = useState(getRecipes());
	const [createRecipeModalIsOpen, setCreateRecipeModalIsOpen] = useState(false);
	const [filter, setFilter] = useState("");

	const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()));

	return (
		<Page
			title="Recettes"
		>
			<div
				className="flex flex-col space-y-4 items-center"
			>
				<div className="grid grid-cols-2 gap-2">
					<Input
						value={filter}
						onChange={event => setFilter(event.target.value)}
						placeholder="Rechercher"
					/>
					<Button
						onClick={() => setCreateRecipeModalIsOpen(true)}
					>
						Créer une recette
					</Button>
				</div>
				<div className="w-full grid grid-flow-row gap-4 justify-center grid-cols-2 sm:grid-cols-[repeat(auto-fill,150px)]">
					{
						filteredRecipes
							.map(recipe => {
								return (
									<RecipeThumbnail
										key={recipe.id}
										id={recipe.id}
										name={recipe.name}
										imageUrl={recipe.imageUrl}
									/>
								);
							})
					}
				</div>
			</div>
			{
				createRecipeModalIsOpen
					? (
						<CreateRecipeModal
							close={() => setCreateRecipeModalIsOpen(false)}
							onSubmit={() => {
								setRecipes(getRecipes());
							}}
						/>
					)
					: null
			}
		</Page>
	);
};