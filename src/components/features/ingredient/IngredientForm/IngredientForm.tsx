import { Input } from "@mui/material";
import { Button } from "../../../common/Button/Button";
import type { TIngredient } from "../ingredient.types";
import { AvailableUnitTypesForm } from "./AvailableUnitTypesForm/AvailableUnitTypesForm";
import { CategoryForm } from "./CategoryForm/CategoryForm";
import { ConversionForm } from "./ConversionForm/ConversionForm";
import { ReferenceUnitTypeForm } from "./ReferenceUnitTypeForm/ReferenceUnitTypeForm";
import { useIngredientFormData } from "./useIngredientFormData";
import { useOnAvailableUnitTypesChange } from "./useOnAvailableUnitTypesChange";
import { useOnCategoryChange } from "./useOnCategoryChange";
import { useOnNameChange } from "./useOnNameChange";
import { useOnReferenceUnitTypeChange } from "./useOnReferenceUnitTypeChange";
import { useOnUnitTypeConversionRatesChange } from "./useOnUnitTypeConversionRatesChange";
import { useSyncAvailableUnitTypesAndUnitTypeConversionRates } from "./useSyncAvailableUnitTypesAndUnitTypeConversionRates";
import { useSyncIngredientFormDataAndIngredient } from "./useSyncIngredientFormDataAndIngredient";
import { useSyncReferenceUnitTypeAndAvailableUnitTypes } from "./useSyncReferenceUnitTypeAndAvailableUnitTypes";

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
	const onReferenceUnitTypeChange = useOnReferenceUnitTypeChange(setIngredientFormData);
	const onAvailableUnitTypesChange = useOnAvailableUnitTypesChange(setIngredientFormData);
	const onUnitTypeConversionRatesChange = useOnUnitTypeConversionRatesChange(ingredientFormData, setIngredientFormData);

	useSyncIngredientFormDataAndIngredient(ingredientFormData, setIngredient);
	useSyncReferenceUnitTypeAndAvailableUnitTypes(ingredientFormData, setIngredientFormData);
	useSyncAvailableUnitTypesAndUnitTypeConversionRates(ingredientFormData, setIngredientFormData);

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
			<ReferenceUnitTypeForm
				referenceUnitType={ingredientFormData.referenceUnitType.value}
				setReferenceUnitType={onReferenceUnitTypeChange}
			/>
			<AvailableUnitTypesForm
				referenceUnitType={ingredientFormData.referenceUnitType.value}
				availableUnitTypes={ingredientFormData.availableUnitTypes.value}
				setAvailableUnitTypes={onAvailableUnitTypesChange}
			/>
			{
				ingredientFormData.availableUnitTypes.value.length > 1
					? (
						<ConversionForm
							referenceUnitType={ingredientFormData.referenceUnitType.value}
							unitTypeConversionRates={ingredientFormData.unitTypeConversionRates.value}
							onUnitTypeConversionRatesChange={onUnitTypeConversionRatesChange}
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