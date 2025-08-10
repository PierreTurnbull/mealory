import { useNavigate } from "react-router";
import { Dropdown, type TChoice } from "../../../common/Dropdown/Dropdown";
import { IconButton } from "../../../common/IconButton/IconButton";
import { Tooltip } from "../../../common/Tooltip/Tooltip";
import type { TRecipe } from "../../recipe/recipe.types";
import type { TPlanningDay } from "../planning.types";

type TCalendarMealProps = {
	mealType:            keyof TPlanningDay
	planningDay:         TPlanningDay
	selectRecipe:        (mealKey: keyof TPlanningDay, recipeId: number | null) => void
	onCreateRecipeClick: () => void
}

export const CalendarMeal = ({
	mealType,
	planningDay,
	selectRecipe,
	onCreateRecipeClick,
}: TCalendarMealProps) => {
	const navigate = useNavigate();

	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes) as TRecipe[]
		: [];

	const recipeChoices: TChoice<typeof recipes[number]["id"] | null>[] = recipes.map(recipe => {
		const choice: TChoice<typeof recipe["id"]> = {
			value:      recipe.id,
			label:      recipe.name,
			isDisabled: false,
		};

		return choice;
	});

	recipeChoices.unshift({
		value:      null,
		label:      "Aucune recette",
		isDisabled: false,
	});

	return (
		<div className="flex gap-2">
			<Dropdown
				value={planningDay[mealType].recipeId}
				choices={recipeChoices}
				onChange={value => {
					selectRecipe(mealType, value);
				}}
				isSearchable
				placeholder="Sélectionner une recette"
			/>
			<Tooltip
				title="Aller à la recette"
			>
				<IconButton
					icon="➜"
					isDisabled={planningDay[mealType].recipeId === null}
					onClick={() => navigate(`/recipes/${planningDay[mealType].recipeId}`)}
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
		</div>
	);
};