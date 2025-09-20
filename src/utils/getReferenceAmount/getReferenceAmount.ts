import { getIngredientWithDefault } from "../../components/features/ingredient/defaultIngredients/getIngredientWithDefault";
import type { TIngredientUnitType } from "../../components/features/ingredient/ingredient.types";
import { ingredientUnitTypesConfig, type TIngredientUnitTypeConfig } from "../../components/features/ingredient/ingredientUnits.model";
import { roundAmount } from "../../components/features/ingredient/roundAmount";
import type { TRecipeIngredient } from "../../components/features/recipe/recipe.types";

/**
 * Returns the amount converted into the ingredient's reference unit.
 */
export const getReferenceAmount = (
	recipeIngredient: TRecipeIngredient,
) => {
	const ingredient = getIngredientWithDefault(recipeIngredient.id);

	if (!ingredient) {
		throw new Error(`Missing ingredient with id ${recipeIngredient.id}`);
	}

	let ingredientUnitTypeConfig: TIngredientUnitTypeConfig | undefined;
	let ingredientUnitType: TIngredientUnitType | undefined;
	
	Object.entries(ingredientUnitTypesConfig)
		.find(entry => {
			const unitMatchesUnitType = Object.keys(entry[1].units).includes(recipeIngredient.unit);

			if (unitMatchesUnitType) {
				ingredientUnitType = entry[0] as TIngredientUnitType;
				ingredientUnitTypeConfig = entry[1];
			}

			return unitMatchesUnitType;
		});

	if (!ingredientUnitTypeConfig || !ingredientUnitType) {
		throw new Error(`Unit ${recipeIngredient.unit} in recipe ingredient ${recipeIngredient.id} is not enabled on this ingredient.`);
	}

	let amount: number;

	if (recipeIngredient.unit === ingredientUnitTypesConfig[ingredient.referenceUnitType].referenceUnit) {
		amount = recipeIngredient.amount;
	} else if (ingredientUnitType === ingredient.referenceUnitType) {
		const unitConversionRate = ingredientUnitTypeConfig.units[recipeIngredient.unit]!.conversionRate;

		amount = recipeIngredient.amount * unitConversionRate;
	} else {
		// convert unit in reference unit
		const unitConversionRate = ingredientUnitTypeConfig.units[recipeIngredient.unit]!.conversionRate;

		amount = recipeIngredient.amount * unitConversionRate;

		// convert reference unit from current unit type to reference unit type
		const unitTypeConversionRate = ingredient.unitTypeConversionRates[ingredientUnitType]!;

		amount = amount / unitTypeConversionRate;
	}

	amount = roundAmount(amount);

	return amount;
};