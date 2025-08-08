import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import type { TIngredient, TReferenceIngredientUnit } from "../ingredient.types";

type TUpdateIngredientModalProps = {
	close:     () => void
	onSubmit?: () => void
	id:        TIngredient["id"]
}

export const UpdateIngredientModal = ({
	close,
	onSubmit,
	id,
}: TUpdateIngredientModalProps) => {
	const ingredients: TIngredient[] = localStorage.ingredients
		? JSON.parse(localStorage.ingredients)
		: [];
	const ingredient = ingredients.find(ingredient => ingredient.id === id);

	if (!ingredient) {
		throw new Error(`Missing ingredient with id ${id}.`);
	}

	const [name, setName] = useState<TIngredient["name"]>(ingredient.name);
	const [unit, setUnit] = useState<TReferenceIngredientUnit>(ingredient.unit);

	const submit = (
		name: TIngredient["name"],
		unit: TIngredient["unit"],
	) => {
		const nextIngredients: TIngredient[] = localStorage.ingredients
			? JSON.parse(localStorage.ingredients)
			: [];
		const ingredientToUpdate = nextIngredients.find(ingredient => ingredient.id === id);

		if (!ingredientToUpdate) {
			throw new Error(`Missing ingredient with id ${id}.`);
		}

		ingredientToUpdate.name = name;
		ingredientToUpdate.unit = unit;

		localStorage.ingredients = JSON.stringify(nextIngredients);

		onSubmit?.();
	};

	return (
		<Modal
			close={close}
			title="Modifier un ingrédient"
		>
			<IngredientForm
				name={name}
				unit={unit}
				setName={setName}
				setUnit={setUnit}
				submit={submit}
				close={close}
			/>
		</Modal>
	);
};