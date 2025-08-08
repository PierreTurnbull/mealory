import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import type { TIngredient, TReferenceIngredientUnit } from "../ingredient.types";

type TCreateIngredientModalProps = {
	close:     () => void
	onSubmit?: () => void
}

export const CreateIngredientModal = ({
	close,
	onSubmit,
}: TCreateIngredientModalProps) => {
	const [name, setName] = useState<TIngredient["name"]>("");
	const [unit, setUnit] = useState<TReferenceIngredientUnit>("amount");

	const submit = (
		name: TIngredient["name"],
		unit: TIngredient["unit"],
	) => {
		const nextIngredients: TIngredient[] = localStorage.ingredients
			? JSON.parse(localStorage.ingredients)
			: [];
		const nextIngredient: TIngredient = {
			id:   (nextIngredients.at(-1)?.id || 0) + 1,
			name: name,
			unit: unit,
		};

		nextIngredients.push(nextIngredient);

		localStorage.ingredients = JSON.stringify(nextIngredients);

		onSubmit?.();
	};

	return (
		<Modal
			close={close}
			title="Créer un ingrédient"
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