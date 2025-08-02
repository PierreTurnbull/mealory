import { useState } from "react";
import type { TIngredient, TIngredientUnit } from "../../../../types/ingredient.types";
import { Button } from "../../../common/Button/Button";
import { Modal } from "../../../common/Modal/Modal";
import { TextField } from "../../../common/TextField/TextField";
import { Dropdown, type TChoice } from "../../../common/dropdown/Dropdown";
import { ingredientUnitLabels } from "../../../labels/ingredientUnits";

type TCreateIngredientModalProps = {
	close:     () => void
	onSubmit?: () => void
}

export const CreateIngredientModal = ({
	close,
	onSubmit,
}: TCreateIngredientModalProps) => {
	const [label, setLabel] = useState("");
	const [unit, setUnit] = useState<TIngredientUnit>("count");

	const submit = (ingredient: Omit<TIngredient, "id">) => {
		const nextIngredients: TIngredient[] = localStorage.ingredients
			? JSON.parse(localStorage.ingredients)
			: [];
		const nextIngredient: TIngredient = {
			id: (nextIngredients.at(-1)?.id || 0) + 1,
			...ingredient,
		};

		nextIngredients.push(nextIngredient);

		localStorage.ingredients = JSON.stringify(nextIngredients);

		onSubmit?.();
	};

	const choices: TChoice<TIngredientUnit>[] = (["count", "mass", "volume"] as TIngredientUnit[])
		.map(value => {
			const choice: TChoice<TIngredientUnit> = {
				value: value,
				label: ingredientUnitLabels[value],
			};

			return choice;
		});

	return (
		<Modal
			close={close}
			title="Créer un ingrédient"
		>
			<div className="flex flex-col space-y-4">
				<p>Nom :</p>
				<TextField
					value={label}
					onChange={event => setLabel(event.target.value)}
				/>
				<p>Unité de mesure :</p>
				<Dropdown
					value={unit}
					choices={choices}
					onChange={value => setUnit(value)}
				/>
				<div
					className="flex space-x-2 justify-center"
				>
					<Button
						onClick={() => {
							const ingredient: Omit<TIngredient, "id"> = {
								label: label,
								unit:  unit,
							};

							submit(ingredient);
							close();
						}}
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
			</div>
		</Modal>
	);
};