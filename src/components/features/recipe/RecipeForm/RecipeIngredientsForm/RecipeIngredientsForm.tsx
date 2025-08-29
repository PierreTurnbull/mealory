import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, IconButton, Input, MenuItem, Select } from "@mui/material";
import { useState, type JSX } from "react";
import { ingredientUnitAnnotationLabels, ingredientUnitDirectObjectLabels } from "../../../../../utils/labels/ingredientUnits";
import type { TIngredient } from "../../../ingredient/ingredient.types";
import { UpdateIngredientModal } from "../../../ingredient/UpdateIngredientModal/UpdateIngredientModal";
import type { TRecipeFormData } from "../recipeFormData.types";
import { useRemoveIngredient } from "../useRemoveIngredient";
import type { TIngredientChoice } from "./ingredientChoice.types";
import type { TUnitChoice } from "./unitChoice.types";
import { useOnAmountChange } from "./useOnAmountChange";
import { useOnIngredientChange } from "./useOnIngredientChange";
import { useOnUnitChange } from "./useOnUnitChange";

type TRecipeIngredientFormProps = {
	ingredients:        TIngredient[]
	onUpdateIngredient: () => void
	recipeFormData:     TRecipeFormData
	setRecipeFormData:  React.Dispatch<React.SetStateAction<TRecipeFormData>>
}

export const RecipeIngredientsForm = ({
	ingredients,
	onUpdateIngredient,
	recipeFormData,
	setRecipeFormData,
}: TRecipeIngredientFormProps) => {
	const [ingredientBeingUpdatedId, setIngredientBeingUpdatedId] = useState<TIngredient["id"] | null>(null);

	const removeIngredient = useRemoveIngredient(setRecipeFormData);
	const onAmountChange = useOnAmountChange(setRecipeFormData);
	const onUnitChange = useOnUnitChange(setRecipeFormData);
	const onIngredientChange = useOnIngredientChange(setRecipeFormData);

	return (
		<div
			className="flex gap-2 flex-col items-center"
		>
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
						selectedUnitChoice = unitChoices.find(unitChoice => unitChoice.id === recipeFormData.ingredients[key].unit!.value) || null;

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
								fullWidth
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

					const nameEl = (
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
					);
					const amountEl = (
						<Input
							className="min-w-16"
							value={ingredientFormData.amount.value}
							type="number"
							placeholder="Quantité"
							onChange={event => onAmountChange(event, key)}
						/>
					);
					const actionsEl = (
						<div className="flex gap-2">
							<IconButton
								onClick={() => setIngredientBeingUpdatedId(ingredientFormData.id.value)}
							>
								<EditIcon />
							</IconButton>
							<IconButton
								onClick={() => removeIngredient(key)}
							>
								<DeleteIcon />
							</IconButton>
						</div>
					);

					return (
						<div
							key={key}
							className="flex flex-col gap-2 border-violet-200 not-last:border-b-1 not-last:pb-2 sm:border-b-0! sm:pb-0! w-full"
						>
							<div className="sm:hidden grid grid-cols-[1fr_auto] gap-2">
								{nameEl}
								{actionsEl}
							</div>
							<div className="sm:hidden grid grid-cols-[1fr_2fr] gap-2 items-center">
								{amountEl}
								{unitEl}
							</div>

							<div className="grid-cols-[1fr_min-content_1fr_min-content] gap-2 hidden sm:grid items-center">
								{nameEl}
								{amountEl}
								{unitEl || <span></span>}
								{actionsEl}
							</div>
							{
								ingredientBeingUpdatedId === ingredientFormData.id.value
									? (
										<UpdateIngredientModal
											id={ingredientFormData.id.value}
											close={() => setIngredientBeingUpdatedId(null)}
											onSubmit={updatedIngredient => {
												const selectedUnitIsntAvailableAnymore = (
													!updatedIngredient.availableUnits.includes(ingredientFormData.unit!.value)
												);

												if (selectedUnitIsntAvailableAnymore) {
													setRecipeFormData(prev => {
														const next = structuredClone(prev);

														if (next.ingredients[key].unit) {
															next.ingredients[key].unit.value = updatedIngredient.referenceUnit;
														} else {
															next.ingredients[key].unit = {
																value: updatedIngredient.referenceUnit,
															};
														}

														return next;
													});
												}
												onUpdateIngredient();
											}}
										/>
									)
									: null
							}
						</div>
					);
				})
			}
		</div>
	);
};