import { Input } from "@mui/material";
import { Button } from "../../../common/Button/Button";
import type { TIngredient } from "../ingredient.types";
import { AvailableUnitsForm } from "./AvailableUnitsForm/AvailableUnitsForm";
import { CategoryForm } from "./CategoryForm/CategoryForm";
import { ConversionForm } from "./ConversionForm/ConversionForm";
import { ReferenceUnitForm } from "./ReferenceUnitForm/ReferenceUnitForm";
import { useIngredientFormData } from "./useIngredientFormData";
import { useOnAvailableUnitsChange } from "./useOnAvailableUnitsChange";
import { useOnCategoryChange } from "./useOnCategoryChange";
import { useOnNameChange } from "./useOnNameChange";
import { useOnReferenceUnitChange } from "./useOnReferenceUnitChange";
import { useOnUnitConversionRatesChange } from "./useOnUnitConversionRatesChange";
import { useSyncAvailableUnitsAndUnitConversionRates } from "./useSyncAvailableUnitsAndUnitConversionRates";
import { useSyncIngredientFormDataAndIngredient } from "./useSyncIngredientFormDataAndIngredient";
import { useSyncReferenceUnitAndAvailableUnits } from "./useSyncReferenceUnitAndAvailableUnits";

type TIngredientFormProps<T> = {
	ingredient:    T
	setIngredient: React.Dispatch<React.SetStateAction<T>>
	submit:        () => void
	close:         () => void
}

export const IngredientForm = <T extends TIngredient | Omit<TIngredient, "id">>({
	ingredient,
	setIngredient,
	submit,
	close,
}: TIngredientFormProps<T>) => {
	const [ingredientFormData, setIngredientFormData] = useIngredientFormData(ingredient);

	const onNameChange = useOnNameChange(setIngredientFormData);
	const onCategoryChange = useOnCategoryChange(setIngredientFormData);
	const onReferenceUnitChange = useOnReferenceUnitChange(setIngredientFormData);
	const onAvailableUnitsChange = useOnAvailableUnitsChange(setIngredientFormData);
	const onUnitConversionRatesChange = useOnUnitConversionRatesChange(setIngredientFormData);

	useSyncIngredientFormDataAndIngredient(ingredientFormData, setIngredient);
	useSyncReferenceUnitAndAvailableUnits(ingredientFormData, setIngredientFormData);
	useSyncAvailableUnitsAndUnitConversionRates(ingredientFormData, setIngredientFormData);

	return (
		<div className="flex flex-col space-y-4">
			<p>Nom :</p>
			<Input
				value={ingredientFormData.name.value}
				onChange={onNameChange}
			/>
			<CategoryForm
				category={ingredientFormData.category.value}
				setCategory={onCategoryChange}
			/>
			<ReferenceUnitForm
				referenceUnit={ingredientFormData.referenceUnit.value}
				setReferenceUnit={onReferenceUnitChange}
			/>
			<AvailableUnitsForm
				referenceUnit={ingredientFormData.referenceUnit.value}
				availableUnits={ingredientFormData.availableUnits.value}
				setAvailableUnits={onAvailableUnitsChange}
			/>
			{
				ingredientFormData.availableUnits.value.length > 1
					? (
						<ConversionForm
							referenceUnit={ingredientFormData.referenceUnit.value}
							unitConversionRates={ingredientFormData.unitConversionRates.value}
							setUnitConversionRates={onUnitConversionRatesChange}
						/>
					)
					: null
			}
			<div
				className="flex space-x-2 justify-center"
			>
				<Button
					onClick={() => {
						submit();
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