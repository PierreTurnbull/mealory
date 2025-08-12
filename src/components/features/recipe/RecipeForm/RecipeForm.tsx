import { Autocomplete, Input } from "@mui/material";
import { Fragment, useState } from "react";
import { ingredientUnitAnnotationLabels, ingredientUnitDirectObjectLabels } from "../../../../utils/labels/ingredientUnits";
import { Button } from "../../../common/Button/Button";
import { IconButton } from "../../../common/IconButton/IconButton";
import { CreateIngredientModal } from "../../ingredient/CreateIngredientModal/CreateIngredientModal";
import { DefaultIngredient } from "../../ingredient/DefaultIngredient";
import type { TAliasIngredientUnit, TIngredient } from "../../ingredient/ingredient.types";
import { ingredientUnitsModel } from "../../ingredient/ingredientUnits.model";
import type { TRecipe, TRecipeIngredient } from "../recipe.types";

type TRecipeFormProps = {
	name:            TRecipe["name"]
	description:     TRecipe["description"]
	imageUrl:        TRecipe["imageUrl"]
	ingredients:     TRecipe["ingredients"]
	instructions:    TRecipe["instructions"]
	setName:         (name: TRecipe["name"]) => void
	setDescription:  (description: TRecipe["description"]) => void
	setImageUrl:     (imageUrl: TRecipe["imageUrl"]) => void
	setIngredients:  (ingredients: TRecipe["ingredients"]) => void
	setInstructions: (instructions: TRecipe["instructions"]) => void
	submit:      (
		name: TRecipe["name"],
		description: TRecipe["description"],
		imageUrl: TRecipe["imageUrl"],
		ingredients: TRecipe["ingredients"],
		instructions: TRecipe["instructions"],
	) => void
	close: () => void
}

export const RecipeForm = ({
	name,
	description,
	imageUrl,
	ingredients: recipeIngredients,
	instructions,
	setName,
	setDescription,
	setImageUrl,
	setIngredients: setRecipeIngredients,
	setInstructions,
	submit,
	close,
}: TRecipeFormProps) => {
	const ingredients: TIngredient[] = localStorage.ingredients
		? JSON.parse(localStorage.ingredients)
		: [];

	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);

	/**
	 * Returns the first ingredient id that is not used by another ingredient in the recipe.
	 */
	const getDefaultId = () => {
		const ids = ingredients.map(ingredient => ingredient.id).sort((a, b) => b - a).reverse();
		const recipeIngredientIds = recipeIngredients.map(recipeIngredient => recipeIngredient.id);

		let id: number | null = null;
		let cursor = 0;

		while (cursor < ids.length && id === null) {
			if (!recipeIngredientIds.includes(ids[cursor])) {
				id = ids[cursor];
			}

			cursor++;
		}

		return id;
	};

	const addIngredient = () => {
		const newIngredient: TRecipeIngredient = {
			amount:    0,
			id:        getDefaultId()!,
			aliasUnit: null,
		};

		setRecipeIngredients([newIngredient, ...recipeIngredients]);
	};

	const removeIngredient = (index: number) => {
		setRecipeIngredients([...recipeIngredients.slice(0, index), ...recipeIngredients.slice(index + 1)]);
	};

	const updateIngredient = (
		id: TRecipeIngredient["id"],
		amount: TRecipeIngredient["amount"],
		unit: TIngredient["unit"],
		aliasUnit: TRecipeIngredient["aliasUnit"],
	) => {
		const nextRecipeIngredients = structuredClone(recipeIngredients);
		const nextRecipeIngredient = nextRecipeIngredients.find(nextRecipeIngredient => nextRecipeIngredient.id === id)!;

		nextRecipeIngredient.amount = amount;
		nextRecipeIngredient.aliasUnit = unit === aliasUnit ? null : aliasUnit;

		setRecipeIngredients(nextRecipeIngredients);
	};

	let submitIsDisabled = false;
	let submitTooltip: string | null = null;
	if (instructions.length === 0) {
		submitIsDisabled = true;
		submitTooltip = "Ajoute au moins 1 instruction.";
	}
	if (recipeIngredients.find(recipeIngredient => recipeIngredient.amount === 0 || recipeIngredient.amount === null)) {
		submitIsDisabled = true;
		submitTooltip = "Certains ingrédients ont une quantité nulle.";
	}
	if (recipeIngredients.length === 0) {
		submitIsDisabled = true;
		submitTooltip = "Ajoute au moins 1 ingrédient.";
	}
	if (name.length === 0) {
		submitIsDisabled = true;
		submitTooltip = "Ajoute un titre.";
	}

	let addIngredientIsDisabled = false;
	let addIngredientTooltip: string | null = null;
	if (getDefaultId() === null) {
		addIngredientIsDisabled = true;
		addIngredientTooltip = "Tous les ingrédients ont déjà été ajouté.";
	}

	return (
		<div className="flex flex-col space-y-4">
			<p>Nom :</p>
			<Input
				value={name}
				onChange={event => setName(event.target.value)}
			/>
			<p>Description :</p>
			<Input
				value={description}
				onChange={event => setDescription(event.target.value)}
			/>
			<p>Image :</p>
			<Input
				value={imageUrl || ""}
				onChange={event => setImageUrl(event.target.value)}
				placeholder="Insérer l'URL de l'image."
			/>
			<div
				className="max-h-32 rounded flex justify-center"
			>
				{
					imageUrl
						? (
							<img
								className="object-contain max-w-64 max-h-64 rounded"
								src={imageUrl}
							/>
						)
						: (
							<DefaultIngredient />
						)
				}
			</div>
			<p>Ingrédients :</p>
			<div className="grid gap-2 grid-cols-[1fr_1fr]">
				<Button
					onClick={addIngredient}
					isDisabled={addIngredientIsDisabled}
					tooltip={addIngredientTooltip}
				>
					Ajouter un ingrédient
				</Button>
				<Button
					type="secondary"
					onClick={() => setCreateIngredientModalIsOpen(true)}
				>
					Créer un ingrédient
				</Button>
			</div>
			<div
				className="grid grid-cols-[35%_auto_auto_auto] gap-4 items-center"
			>
				{
					recipeIngredients.map((recipeIngredient, key) => {
						const ingredientChoices = ingredients.map(ingredient => {
							const isDisabled = (
								ingredient.id !== recipeIngredient.id && 
								Boolean(recipeIngredients.find(recipeIngredient => recipeIngredient.id === ingredient.id))
							);

							const choice = {
								id:         ingredient.id,
								label:      ingredient.name,
								isDisabled: isDisabled,
							};

							return choice;
						});
						const selectedIngredientChoice = ingredientChoices.find(ingredientChoice => ingredientChoice.id === recipeIngredient.id)!;
						const ingredient: TIngredient & TRecipeIngredient = {
							...ingredients.find(ingredient => ingredient.id === recipeIngredient.id)!,
							amount:    recipeIngredient.amount,
							aliasUnit: recipeIngredient.aliasUnit,
						};
						const availableAliasUnits: TAliasIngredientUnit[] = ingredientUnitsModel[ingredient.unit].expressibleIn;
						const aliasUnitChoices = availableAliasUnits.length > 0
							? [ingredient.unit, ...availableAliasUnits].map(availableAliasUnit => {
								const choice = {
									id:         availableAliasUnit,
									label:      ingredientUnitAnnotationLabels[availableAliasUnit],
									isDisabled: false,
								};

								return choice;
							})
							: null;

						const selectedAliasUnitChoice = aliasUnitChoices
							? (
								aliasUnitChoices.find(aliasUnitChoice => aliasUnitChoice.id === ingredient.aliasUnit) ||
								aliasUnitChoices.find(aliasUnitChoice => aliasUnitChoice.id === ingredient.unit)
							)
							: null;

						return (
							<Fragment
								key={recipeIngredient.id}
							>
								<Autocomplete
									value={selectedIngredientChoice}
									onChange={(_, value) => {
										if (!value) {
											return;
										}

										const nextRecipeIngredients = structuredClone(recipeIngredients);

										const nextRecipeIngredient = nextRecipeIngredients.find(nextRecipeIngredient => nextRecipeIngredient.id === recipeIngredient.id)!;
										nextRecipeIngredient.id = value.id;
										nextRecipeIngredient.amount = 0;

										setRecipeIngredients(nextRecipeIngredients);
									}}
									getOptionDisabled={option => option.isDisabled}
									options={ingredientChoices}
									renderInput={(params) => {
										return (
											<Input
												ref={params.InputProps.ref}
												inputProps={{ ...params.inputProps }}
											/>
										);
									}}
								/>
								<Input
									value={ingredient.amount === null ? "" : String(ingredient.amount)}
									type="number"
									onChange={event => {
										const amount = event.target.value === "" ? null : Number(event.target.value);

										updateIngredient(ingredient.id, amount, ingredient.unit, ingredient.aliasUnit);
									}}
								/>
								{
									availableAliasUnits.length > 0 && aliasUnitChoices && selectedAliasUnitChoice
										? (
											<Autocomplete
												value={selectedAliasUnitChoice}
												options={aliasUnitChoices}
												onChange={(_, option) => {
													if (!option) {
														return;
													}

													updateIngredient(ingredient.id, ingredient.amount, ingredient.unit, option.id);
												}}
												renderInput={(params) => {
													return (
														<Input
															ref={params.InputProps.ref}
															inputProps={{ ...params.inputProps }}
														/>
													);
												}}
											/>
										)
										: (
											<p>{ingredientUnitDirectObjectLabels[ingredient.unit]}</p>
										)
								}
								<IconButton
									icon="🗙"
									onClick={() => removeIngredient(key)}
								/>
							</Fragment>
						);
					})
				}
			</div>
			<p>Instructions :</p>
			<Button
				onClick={() => {
					setInstructions([...instructions, ""]);
				}}
			>
				Ajouter une instruction
			</Button>
			<div
				className="space-y-2"
			>
				{
					instructions.map((instruction, key) => {
						return (
							<div
								key={key}
								className="gap-2 grid grid-cols-[auto_1fr_auto] items-center"
							>
								{key}.
								<Input
									value={instruction}
									onChange={event => {
										const nextInstructions = structuredClone(instructions);

										nextInstructions[key] = event.target.value;

										setInstructions(nextInstructions);
									}}
								/>
								<IconButton
									icon="🗙"
									onClick={() => setInstructions([...instructions.slice(0, key), ...instructions.slice(key + 1)])}
								/>
							</div>
						);
					})
				}
			</div>
			<div
				className="flex space-x-2 justify-center"
			>
				<Button
					onClick={() => {
						submit(name, description, imageUrl, recipeIngredients, instructions);
						close();
					}}
					isDisabled={submitIsDisabled}
					tooltip={submitTooltip}
				>
					Valider
				</Button>
				<Button
					type="secondary"
					onClick={close}
				>
					Annuler
				</Button>
			</div>
			{
				createIngredientModalIsOpen
					? (
						<CreateIngredientModal
							close={() => setCreateIngredientModalIsOpen(false)}
						/>
					)
					: null
			}
		</div>
	);
};