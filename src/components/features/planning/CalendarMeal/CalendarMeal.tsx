import { Autocomplete, Input } from "@mui/material";
import { useNavigate } from "react-router";
import { IconButton } from "../../../common/IconButton/IconButton";
import { Tooltip } from "../../../common/Tooltip/Tooltip";
import type { TRecipe } from "../../recipe/recipe.types";
import type { TPlanningDay } from "../planning.types";

type TCalendarMealProps = {
	mealKey:             keyof TPlanningDay
	planningDay:         TPlanningDay
	selectRecipe:        (mealKey: keyof TPlanningDay, recipeId: NonNullable<TPlanningDay[keyof TPlanningDay]["recipeId"]> | undefined) => void
	deselectRecipe:      (mealKey: keyof TPlanningDay) => void
	onCreateRecipeClick: () => void
}

export const CalendarMeal = ({
	mealKey,
	planningDay,
	selectRecipe,
	deselectRecipe,
	onCreateRecipeClick,
}: TCalendarMealProps) => {
	const navigate = useNavigate();

	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes) as TRecipe[]
		: [];

	const recipeChoices = recipes.map(recipe => {
		const choice: {
			id:    typeof recipe["id"] | undefined
			label: string
		} = {
			id:    recipe.id,
			label: recipe.name,
		};

		return choice;
	});

	const emptyChoice = {
		id:    undefined,
		label: "",
	};
	recipeChoices.unshift(emptyChoice);

	const selectedChoice = recipeChoices.find(recipeChoice => recipeChoice.id === planningDay[mealKey].recipeId) || emptyChoice;

	return (
		<div className="flex gap-2">
			<div className="grow">
				<Autocomplete
					value={selectedChoice}
					onChange={(_, value) => {
						selectRecipe(mealKey, value?.id);
					}}
					options={recipeChoices}
					renderInput={(params) => {
						return (
							<Input
								ref={params.InputProps.ref}
								inputProps={{ ...params.inputProps }}
							/>
						);
					}}
				/>
			</div>
			<Tooltip
				title="Aller à la recette"
			>
				<IconButton
					icon="➜"
					isDisabled={planningDay[mealKey].recipeId === null}
					onClick={() => navigate(`/recipes/${planningDay[mealKey].recipeId}`)}
				/>
			</Tooltip>
			<Tooltip
				title="Ajouter une nouvelle recette"
			>
				<IconButton
					icon="+"
					type="secondary"
					onClick={onCreateRecipeClick}
				/>
			</Tooltip>
			<Tooltip
				title="Désélectionner la recette"
			>
				<IconButton
					icon="🗙"
					isDisabled={planningDay[mealKey].recipeId === null}
					onClick={() => deselectRecipe(mealKey)}
				/>
			</Tooltip>
		</div>
	);
};