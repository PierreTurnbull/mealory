import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton, Input, Tooltip } from "@mui/material";
import { useState } from "react";
import { Button } from "../../../common/Button/Button";
import { CreateIngredientModal } from "../../ingredient/CreateIngredientModal/CreateIngredientModal";
import { DefaultRecipeImage } from "../../ingredient/DefaultRecipeImage/DefaultRecipeImage";
import { getIngredients } from "../../ingredient/ingredient.api";
import type { TRecipe } from "../recipe.types";
import { RecipeIngredientsForm } from "./RecipeIngredientsForm/RecipeIngredientsForm";
import { useOnAddIngredient } from "./useOnAddIngredient";
import { useOnAddInstruction } from "./useOnAddInstruction";
import { useOnDeleteInstruction } from "./useOnDeleteInstruction";
import { useOnDescriptionChange } from "./useOnDescriptionChange";
import { useOnImageUrlChange } from "./useOnImageUrlChange";
import { useOnInstructionChange } from "./useOnInstructionChange";
import { useOnNameChange } from "./useOnNameChange";
import { useOnSwapInstructions } from "./useOnSwapInstructions";
import { useRecipeFormData } from "./useRecipeFormData";
import { useSubmitData } from "./useSubmitData";
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
	const [ingredients, setIngredients] = useState(getIngredients());

	const [instructionToSwapKey, setInstructionToSwapKey] = useState<number | null>(null);

	const [recipeFormData, setRecipeFormData] = useRecipeFormData(recipe);

	const [createIngredientModalIsOpen, setCreateIngredientModalIsOpen] = useState(false);

	const onNameChange = useOnNameChange(setRecipeFormData);
	const onDescriptionChange = useOnDescriptionChange(setRecipeFormData);
	const onImageUrlChange = useOnImageUrlChange(setRecipeFormData);
	const onAddIngredient = useOnAddIngredient(setRecipeFormData);
	const onAddInstruction = useOnAddInstruction(setRecipeFormData);
	const onInstructionChange = useOnInstructionChange(setRecipeFormData);
	const onInstructionDelete = useOnDeleteInstruction(setRecipeFormData);
	const onSwapInstructions = useOnSwapInstructions(setRecipeFormData);

	useSyncRecipeFormDataAndRecipe(recipeFormData, setRecipe);
	const [submitIsDisabled, submitTooltip] = useSubmitData(recipeFormData);

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
			<div className="grid grid-cols-[auto_min-content] gap-2">
				<Input
					value={recipeFormData.imageUrl.value}
					onChange={event => onImageUrlChange(event.target.value)}
					placeholder="Insérer l'URL de l'image."
				/>
				<IconButton
					color="error"
					onClick={() => onImageUrlChange("")}
					disabled={!recipeFormData.imageUrl.value}
				>
					<DeleteIcon />
				</IconButton>
			</div>
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
							<DefaultRecipeImage />
						)
				}
			</div>
			<p>Ingrédients :</p>
			<div className="grid gap-2 grid-cols-[1fr_1fr]">
				<Button
					onClick={() => onAddIngredient()}
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
			<RecipeIngredientsForm
				ingredients={ingredients}
				onUpdateIngredient={() => setIngredients(getIngredients())}
				recipeFormData={recipeFormData}
				setRecipeFormData={setRecipeFormData}
			/>
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
								className="gap-2 grid grid-cols-[auto_1fr_auto_auto] items-center"
							>
								{key + 1}.
								<div className="relative flex">
									<Input
										fullWidth
										value={instructionFormData.value}
										onChange={event => onInstructionChange(key, event.target.value)}
									/>
									{
										instructionToSwapKey === null
											? null
											: (
												<div
													className={`
														group/swap-instructions
														${instructionToSwapKey === key ? "" : "cursor-pointer"}
													`}
													onClick={
														instructionToSwapKey === key
															? undefined
															: () => {
																onSwapInstructions(instructionToSwapKey, key);
																setInstructionToSwapKey(null);
															}
													}
												>
													<div
														className={`
															absolute
															top-0
															right-0
															bottom-0
															left-0
															bg-violet-500
															rounded
															opacity-50
															${instructionToSwapKey === key ? "" : "group-hover/swap-instructions:bg-violet-400"}
														`}
													>
													</div>
													<div
														className="absolute top-1/2 left-1/2 bg-violet-50 rounded -translate-1/2"
													>
														{
															instructionToSwapKey === key
																? ""
																: (
																	<p
																		className="rounded text-xs px-4 py-1"
																	>
																		Échanger
																	</p>
																)
														}
													</div>
												</div>
											)
									}
								</div>
								{
									instructionToSwapKey === key
										? (
											<IconButton
												color="error"
												onClick={() => setInstructionToSwapKey(null)}
											>
												<CloseIcon />
											</IconButton>
										)
										: instructionToSwapKey === null
											? (
												<Tooltip title="Changer l'instruction de place.">
													<div>
														<IconButton
															color="secondary"
															onClick={() => setInstructionToSwapKey(key)}
															disabled={recipeFormData.instructions.length === 1}
														>
															<SwapVertIcon />
														</IconButton>
													</div>
												</Tooltip>
											)
											: (
												<Tooltip title="Échanger.">
													<div>
														<IconButton
															color="secondary"
															onClick={() => {
																onSwapInstructions(instructionToSwapKey, key);
																setInstructionToSwapKey(null);
															}}
														>
															<CheckIcon />
														</IconButton>
													</div>
												</Tooltip>
											)
								}
								<IconButton
									onClick={() => {
										onInstructionDelete(key);
										setInstructionToSwapKey(null);
									}}
								>
									<DeleteIcon />
								</IconButton>
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
							onSubmit={createdIngredient => {
								setIngredients(getIngredients());
								onAddIngredient(createdIngredient.id);
							}}
						/>
					)
					: null
			}
		</div>
	);
};