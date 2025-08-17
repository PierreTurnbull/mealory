import { useState } from "react";
import { Modal } from "../../../common/Modal/Modal";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import { createIngredient } from "../ingredient.api";
import type { TIngredient } from "../ingredient.types";

type TCreateIngredientModalProps = {
	close:     () => void
	onSubmit?: () => void
}

export const CreateIngredientModal = ({
	close,
	onSubmit,
}: TCreateIngredientModalProps) => {
	const [ingredient, setIngredient] = useState<Omit<TIngredient, "id">>({
		name:                "",
		referenceUnit:       "amount",
		availableUnits:      [],
		unitConversionRates: {},
	});

	const submit = () => {
		createIngredient(ingredient);
		onSubmit?.();
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