import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { CreateRecipeModal } from "../../features/recipe/CreateRecipeModal/CreateRecipeModal";
import type { TRecipe } from "../../features/recipe/recipe.types";
import { RecipeThumbnail } from "../../features/recipe/RecipeThumbnail/RecipeThumbnail";

export const Recipes = () => {
	const [recipes, setRecipes] = useState<TRecipe[]>([]);
	const [createRecipeModalIsOpen, setCreateRecipeModalIsOpen] = useState(false);
	const [filter, setFilter] = useState("");

	const fetchRecipes = () => {
		setRecipes(
			localStorage.recipes
				? JSON.parse(localStorage.recipes)
				: [],
		);
	};
		
	useEffect(() => {
		fetchRecipes();
	}, []);

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
							onSubmit={fetchRecipes}
						/>
					)
					: null
			}
		</Page>
	);
};