import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import { getIngredient, updateIngredient } from "../ingredient.api";
import type { TIngredient } from "../ingredient.types";

type TUpdateIngredientModalProps = {
	id:        TIngredient["id"]
	close:     () => void
	onSubmit?: (updatedIngredient: TIngredient) => void
}

export const UpdateIngredientModal = ({
	id,
	close,
	onSubmit,
}: TUpdateIngredientModalProps) => {
	const initialIngredient = getIngredient(id);

	if (!initialIngredient) {
		throw new Error(`Missing ingredient with id ${id}.`);
	}

	const [ingredient, setIngredient] = useState(initialIngredient);

	const submit = () => {
		const updatedIngredient = updateIngredient(id, ingredient);
		onSubmit?.(updatedIngredient);
	};

	return (
		<Modal
			close={close}
			title="Modifier un ingrédient"
		>
			<IngredientForm
				ingredient={ingredient}
				setIngredient={setIngredient}
				submit={submit}
				close={close}
			/>
		</Modal>
	);
};