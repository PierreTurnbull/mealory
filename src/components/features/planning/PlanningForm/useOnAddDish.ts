import { v4 } from "uuid";
import type { TRecipe } from "../../recipe/recipe.types";
import type { TPlanningDishFormData, TPlanningFormData } from "./planningFormData.types";

export const useOnAddDish = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
	setAddDishModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	defaultPortions: number,
) => {
	return (
		id: TRecipe["id"],
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const planningDishFormData: TPlanningDishFormData = {
				id:       v4(),
				recipeId: id,
				portions: {
					value: String(defaultPortions),
				},
			};

			next.dishes.push(planningDishFormData);

			return next;
		});

		setAddDishModalIsOpen(false);
	};
};