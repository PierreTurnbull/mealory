import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import { getIngredientWithDefault } from "../defaultIngredients/getIngredientWithDefault";
import { updateIngredient } from "../ingredient.api";
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
	const initialIngredient = getIngredientWithDefault(id);

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