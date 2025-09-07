import { useCallback, useState, type ReactNode } from "react";
import { dbClient } from "../../../../dbClient/dbClient";
import { useOnMount } from "../../../../utils/useOnMount/useOnMount";
import { useNotificationsContext } from "../../notification/context/useNotificationsContext";
import { getIngredients } from "../ingredient.api";
import type { TIngredient, TIngredientUnit, TReferenceIngredientUnit } from "../ingredient.types";
import { referenceUnits, units } from "../units";
import { IngredientsContext } from "./IngredientsContext";
import type { TIngredientsContextState } from "./ingredientsContextState.type";

type TIngredientsProviderProps = {
	children: ReactNode,
}

export const IngredientsProvider = ({
	children,
}: TIngredientsProviderProps) => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const notificationsContext = useNotificationsContext();

	const fetchIngredients = useCallback(async () => {
		console.info("Loading remote ingredients.");

		setIsLoading(true);

		const { data, error } = await dbClient.from("ingredients").select("*, ingredient_available_units ( * )");

		if (error) {
			const localIngredients = getIngredients();
			setIngredients(localIngredients);
			console.info(`Failed to load ingredients. Loaded ${localIngredients.length} local ingredients instead.`);

			notificationsContext.addNotification("Impossible de charger les ingrédients.", "error");
		} else {
			const ingredients = data.map(item => {
				const ingredientReferenceUnit = item.reference_unit;
				const ingredientReferenceUnitIsValid = ((referenceUnit: unknown): referenceUnit is TIngredient["referenceUnit"] => referenceUnits.includes(referenceUnit as TReferenceIngredientUnit))(ingredientReferenceUnit);

				if (!ingredientReferenceUnitIsValid) {
					throw new Error(`Ingredient ${item.id}'s reference unit ${ingredientReferenceUnitIsValid} is not valid.`);
				}

				const ingredient: TIngredient = {
					id:             item.id,
					name:           item.name,
					referenceUnit:  ingredientReferenceUnit,
					availableUnits: item.ingredient_available_units!.map(ingredient_available_unit => {
						const ingredientAvailableUnit = ingredient_available_unit.available_unit;
						const ingredientAvailableUnitIsValid = ((availableUnit: unknown): availableUnit is TIngredient["availableUnits"][number]["unit"] => units.includes(availableUnit as TIngredientUnit))(ingredientAvailableUnit);

						if (!ingredientAvailableUnitIsValid) {
							throw new Error(`Ingredient ${item.id}'s available unit ${ingredientAvailableUnit} is not valid.`);
						}

						const availabeUnit: TIngredient["availableUnits"][number] = {
							unit:           ingredientAvailableUnit,
							conversionRate: ingredient_available_unit.conversion_rate,
						};

						return availabeUnit;
					}),
				};

				return ingredient;
			});

			setIngredients(ingredients);

			console.info(`Loaded ${ingredients.length} remote ingredients.`);
		}

		setIsLoading(false);
	}, [notificationsContext]);
	
	useOnMount(fetchIngredients);

	const contextValue: TIngredientsContextState = {
		ingredients:    ingredients,
		setIngredients: setIngredients,
		isLoading:      isLoading,
		setIsLoading:   setIsLoading,
	};

	return (
		<IngredientsContext.Provider value={contextValue}>
			{children}
		</IngredientsContext.Provider>
	);
};