import { Autocomplete, Input, MenuItem, Select } from "@mui/material";
import type { JSX } from "react";
import { Fragment } from "react/jsx-runtime";
import { ingredientUnitAnnotationLabels, ingredientUnitDirectObjectLabels } from "../../../../../utils/labels/ingredientUnits";
import { IconButton } from "../../../../common/IconButton/IconButton";
import type { TIngredient } from "../../../ingredient/ingredient.types";
import type { TRecipeFormData } from "../recipeFormData.types";
import { useRemoveIngredient } from "../useRemoveIngredient";
import type { TIngredientChoice } from "./ingredientChoice.types";
import type { TUnitChoice } from "./unitChoice.types";
import { useOnAmountChange } from "./useOnAmountChange";
import { useOnIngredientChange } from "./useOnIngredientChange";
import { useOnUnitChange } from "./useOnUnitChange";

type TRecipeIngredientFormProps = {
	ingredients:       TIngredient[]
	recipeFormData:    TRecipeFormData
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>
}

export const RecipeIngredientsForm = ({
	ingredients,
	recipeFormData,
	setRecipeFormData,
}: TRecipeIngredientFormProps) => {
	const removeIngredient = useRemoveIngredient(setRecipeFormData);
	const onAmountChange = useOnAmountChange(setRecipeFormData);
	const onUnitChange = useOnUnitChange(setRecipeFormData);
	const onIngredientChange = useOnIngredientChange(setRecipeFormData);

	return (
		<Fragment>
			{
				recipeFormData.ingredients.map((ingredientFormData, key) => {
					const ingredientChoices = ingredients.map(ingredient => {
						const isDisabled = (
							ingredient.id !== ingredientFormData.id.value && 
							Boolean(recipeFormData.ingredients.find(recipeIngredientFormData => recipeIngredientFormData.id.value === ingredient.id))
						);

						const choice: TIngredientChoice = {
							id:         ingredient.id,
							label:      ingredient.name,
							isDisabled: isDisabled,
						};

						return choice;
					});
					const selectedIngredientChoice = ingredientChoices.find(ingredientChoice => ingredientChoice.id === ingredientFormData.id.value) || null;
					const selectedIngredient = ingredients.find(ingredient => ingredient.id === ingredientFormData.id.value);

					let unitChoices: TUnitChoice[] | null = null;
					let selectedUnitChoice: TUnitChoice | null = null;

					if (selectedIngredient) {
						const availableUnits = selectedIngredient.availableUnits;
						unitChoices = availableUnits.map(availableUnit => {
							const choice = {
								id:                availableUnit,
								label:             ingredientUnitAnnotationLabels[availableUnit],
								directObjectLabel: ingredientUnitDirectObjectLabels[availableUnit],
								isDisabled:        false,
							};

							return choice;
						});
						selectedUnitChoice = unitChoices.find(unitChoice => unitChoice.id === recipeFormData.ingredients[key].unit.value) || null;

						if (!selectedUnitChoice) {
							selectedUnitChoice = unitChoices.find(unitChoice => unitChoice.id === selectedIngredient.referenceUnit) || null;
						}
					}

					let unitEl: JSX.Element | null = null;

					if (!selectedIngredient) {
						unitEl = null;
					// one choice
					} else if (unitChoices && selectedUnitChoice && unitChoices.length === 1) {
						unitEl = (
							<p>{selectedUnitChoice?.directObjectLabel}</p>
						);
					// multiple choices
					} else if (unitChoices && selectedUnitChoice && unitChoices.length > 1) {
						unitEl = (
							<Select
								value={selectedUnitChoice.id}
								onChange={(event) => {
									onUnitChange(event.target.value, key);
								}}
							>
								{
									unitChoices.map(unitChoice => {
										return (
											<MenuItem
												key={unitChoice.id}
												value={unitChoice.id}
											>
												{ingredientUnitAnnotationLabels[unitChoice.id]}
											</MenuItem>
										);
									})
								}
							</Select>
						);
					}

					return (
						<Fragment
							key={key}
						>
							<Autocomplete
								value={selectedIngredientChoice}
								onChange={(_, value) => onIngredientChange(key, value)}
								getOptionDisabled={option => option.isDisabled}
								options={ingredientChoices}
								renderInput={(params) => {
									return (
										<Input
											placeholder="Ingrédient"
											ref={params.InputProps.ref}
											inputProps={{ ...params.inputProps }}
										/>
									);
								}}
							/>
							<Input
								value={ingredientFormData.amount.value}
								type="number"
								placeholder="Quantité"
								onChange={event => onAmountChange(event, key)}
							/>
							{unitEl}
							<IconButton
								icon="🗙"
								onClick={() => removeIngredient(key)}
							/>
						</Fragment>
					);
				})
			}
		</Fragment>
	);
};