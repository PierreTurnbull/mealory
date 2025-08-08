import { ingredientUnitAnnotationLabels } from "../../../../utils/labels/ingredientUnits";
import { Button } from "../../../common/Button/Button";
import { Dropdown, type TChoice } from "../../../common/Dropdown/Dropdown";
import { TextField } from "../../../common/TextField/TextField";
import type { TIngredient, TReferenceIngredientUnit } from "../ingredient.types";

type TIngredientFormProps = {
	name:    TIngredient["name"]
	unit:    TIngredient["unit"]
	setName: (name: TIngredient["name"]) => void
	setUnit: (unit: TIngredient["unit"]) => void
	submit:  (name: TIngredient["name"], unit: TIngredient["unit"]) => void
	close:   () => void
}

export const IngredientForm = ({
	name,
	unit,
	setName,
	setUnit,
	submit,
	close,
}: TIngredientFormProps) => {
	const ingredientUnits: TReferenceIngredientUnit[] = ["amount", "mass", "volume"];
	const unitChoices: TChoice<TReferenceIngredientUnit>[] = ingredientUnits
		.map(value => {
			const choice: TChoice<TReferenceIngredientUnit> = {
				value:      value,
				label:      ingredientUnitAnnotationLabels[value],
				isDisabled: false,
			};

			return choice;
		});

	return (
		<div className="flex flex-col space-y-4">
			<p>Nom :</p>
			<TextField
				value={name}
				onChange={event => setName(event.target.value)}
			/>
			<p>Unité de mesure :</p>
			<Dropdown
				value={unit}
				choices={unitChoices}
				onChange={value => setUnit(value)}
			/>
			<div
				className="flex space-x-2 justify-center"
			>
				<Button
					onClick={() => {
						submit(name, unit);
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
	);
};