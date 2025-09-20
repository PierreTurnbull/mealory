import type { TIngredient, TIngredientUnitType } from "../../../ingredient/ingredient.types";
import { ingredientUnitTypesConfig } from "../../../ingredient/ingredientUnits.model";
import type { TRecipeFormData, TRecipeIngredientFormData } from "../recipeFormData.types";

export const useOnIngredientUpdate = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
	onUpdateIngredient: () => void,
) => {
	return (
		updatedIngredient: TIngredient,
		key: number,
		ingredientFormData: TRecipeIngredientFormData,
	) => {
		const selectedUnitType = Object.entries(ingredientUnitTypesConfig)
			.find(entry => {
				const typesUnits = Object.keys(entry[1].units);
				const unitTypeIsUsed = typesUnits.includes(ingredientFormData.unit!.value);

				return unitTypeIsUsed;
			})?.[0] as TIngredientUnitType;
		const selectedUnitTypeIsntAvailableAnymore = (
			selectedUnitType &&
			!updatedIngredient.availableUnitTypes.includes(selectedUnitType)
		);

		if (selectedUnitTypeIsntAvailableAnymore) {
			setRecipeFormData(prev => {
				const next = structuredClone(prev);

				const nextUnitTypeConfig = ingredientUnitTypesConfig[updatedIngredient.referenceUnitType];
				const nextUnit = nextUnitTypeConfig.referenceUnit;

				if (next.ingredients[key].unit) {
					next.ingredients[key].unit.value = nextUnit;
				} else {
					next.ingredients[key].unit = {
						value: nextUnit,
					};
				}

				return next;
			});
		}
		onUpdateIngredient();
	};
};