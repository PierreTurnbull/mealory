import { Autocomplete, Input } from "@mui/material";
import { Fragment, useState } from "react";
import { ingredientUnitAnnotationLabels, ingredientUnitDirectObjectLabels } from "../../../../utils/labels/ingredientUnits";
import { Button } from "../../../common/Button/Button";
import { IconButton } from "../../../common/IconButton/IconButton";
import { CreateIngredientModal } from "../../ingredient/CreateIngredientModal/CreateIngredientModal";
import { DefaultIngredientImage } from "../../ingredient/DefaultIngredientImage/DefaultIngredientImage";
import { getIngredients } from "../../ingredient/ingredient.api";
import type { TAliasIngredientUnit, TIngredient } from "../../ingredient/ingredient.types";
import { ingredientUnitsModel } from "../../ingredient/ingredientUnits.model";
import type { TRecipe, TRecipeIngredient } from "../recipe.types";
import { RecipeIngredientsForm } from "./RecipeIngredientsForm/RecipeIngredientsForm";
import { useOnAddIngredient } from "./useOnAddIngredient";
import { useOnAddInstruction } from "./useOnAddInstruction";
import { useOnInstructionDelete } from "./useOnDeleteInstruction";
import { useOnDescriptionChange } from "./useOnDescriptionChange";
import { useOnImageUrlChange } from "./useOnImageUrlChange";
import { useOnInstructionChange } from "./useOnInstructionChange";
import { useOnNameChange } from "./useOnNameChange";
import { useRecipeFormData } from "./useRecipeFormData";
import { useRemoveIngredient } from "./useRemoveIngredient";
import { useSyncRecipeFormDataAndRecipe } from "./useSyncRecipeFormDataAndRecipe";

type TRecipeFormProps<T> = {
	recipe:    T
	setRecipe: React.Dispatch<React.SetStateAction<T>>
	submit:    () => void
	close:     () => void
}

export const RecipeForm = <T extends TRecipe | Omit<TRecipe, "id">>({
	recipe,
	setRecipe,
	submit,
	close,
}: TRecipeFormProps<T>) => {
	const ingredients = getIngredients();

	const [recipeFormData, setRecipeFormData] = useRecipeFormData(recipe);

	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);

	const onNameChange = useOnNameChange(setRecipeFormData);
	const onDescriptionChange = useOnDescriptionChange(setRecipeFormData);
	const onImageUrlChange = useOnImageUrlChange(setRecipeFormData);
	const onAddIngredient = useOnAddIngredient(setRecipeFormData);
	const onAddInstruction = useOnAddInstruction(setRecipeFormData);
	const onInstructionChange = useOnInstructionChange(setRecipeFormData);
	const onInstructionDelete = useOnInstructionDelete(setRecipeFormData);

	useSyncRecipeFormDataAndRecipe(recipeFormData, setRecipe);

	// const updateIngredient = (
	// 	id: TRecipeIngredient["id"],
	// 	amount: TRecipeIngredient["amount"],
	// 	unit: TIngredient["unit"],
	// 	aliasUnit: TRecipeIngredient["aliasUnit"],
	// ) => {
	// 	const nextRecipeIngredients = structuredClone(recipeIngredients);
	// 	const nextRecipeIngredient = nextRecipeIngredients.find(nextRecipeIngredient => nextRecipeIngredient.id === id)!;

	// 	nextRecipeIngredient.amount = amount;
	// 	nextRecipeIngredient.aliasUnit = unit === aliasUnit ? null : aliasUnit;

	// 	setRecipeIngredients(nextRecipeIngredients);
	// };

	// let submitIsDisabled = false;
	// let submitTooltip: string | null = null;
	// if (instructions.length === 0) {
	// 	submitIsDisabled = true;
	// 	submitTooltip = "Ajoute au moins 1 instruction.";
	// }
	// if (recipeIngredients.find(recipeIngredient => recipeIngredient.amount === 0 || recipeIngredient.amount === null)) {
	// 	submitIsDisabled = true;
	// 	submitTooltip = "Certains ingrédients ont une quantité nulle.";
	// }
	// if (recipeIngredients.length === 0) {
	// 	submitIsDisabled = true;
	// 	submitTooltip = "Ajoute au moins 1 ingrédient.";
	// }
	// if (name.length === 0) {
	// 	submitIsDisabled = true;
	// 	submitTooltip = "Ajoute un titre.";
	// }

	return (
		<div className="flex flex-col space-y-4">
			<p>Nom :</p>
			<Input
				value={recipeFormData.name.value}
				onChange={onNameChange}
			/>
			<p>Description :</p>
			<Input
				value={recipeFormData.description.value}
				onChange={onDescriptionChange}
			/>
			<p>Image :</p>
			<Input
				value={recipeFormData.imageUrl.value}
				onChange={onImageUrlChange}
				placeholder="Insérer l'URL de l'image."
			/>
			<div
				className="max-h-32 rounded flex justify-center"
			>
				{
					recipeFormData.imageUrl.value
						? (
							<img
								className="object-contain max-w-64 max-h-64 rounded"
								src={recipeFormData.imageUrl.value}
							/>
						)
						: (
							<DefaultIngredientImage />
						)
				}
			</div>
			<p>Ingrédients :</p>
			<div className="grid gap-2 grid-cols-[1fr_1fr]">
				<Button
					onClick={onAddIngredient}
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
				<RecipeIngredientsForm
					ingredients={ingredients}
					recipeFormData={recipeFormData}
					setRecipeFormData={setRecipeFormData}
				/>
			</div>
			<p>Instructions :</p>
			<Button
				onClick={onAddInstruction}
			>
				Ajouter une instruction
			</Button>
			<div
				className="space-y-2"
			>
				{
					recipeFormData.instructions.map((instructionFormData, key) => {
						return (
							<div
								key={key}
								className="gap-2 grid grid-cols-[auto_1fr_auto] items-center"
							>
								{key}.
								<Input
									value={instructionFormData.value}
									onChange={event => onInstructionChange(key, event.target.value)}
								/>
								<IconButton
									icon="🗙"
									onClick={() => onInstructionDelete(key)}
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
						submit();
						close();
					}}
					// isDisabled={submitIsDisabled}
					// tooltip={submitTooltip}
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