import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import { createIngredient } from "../ingredient.api";
import type { TIngredient } from "../ingredient.types";

type TCreateIngredientModalProps = {
	close:     () => void
	onSubmit?: (createdIngredient: TIngredient) => void
}

export const CreateIngredientModal = ({
	close,
	onSubmit,
}: TCreateIngredientModalProps) => {
	const [ingredient, setIngredient] = useState<Omit<TIngredient, "id">>({
		name:           "",
		referenceUnit:  "amount",
		availableUnits: [],
	});

	const submit = () => {
		const createdIngredient = createIngredient(ingredient);
		onSubmit?.(createdIngredient);
	};

	return (
		<Modal
			close={close}
			title="Créer un ingrédient"
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