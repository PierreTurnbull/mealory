import { MenuItem, Select } from "@mui/material";
import { ingredientUnitAnnotationLabels } from "../../../../../utils/labels/ingredientUnits";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TReferenceIngredientUnit } from "../../ingredient.types";
import type { TIngredientFormData } from "../ingredientFormData.types";

type TReferenceUnitForm = {
	referenceUnit:    TReferenceIngredientUnit,
	setReferenceUnit: (value: TIngredientFormData["referenceUnit"]["value"]) => void
}

export const ReferenceUnitForm = ({
	referenceUnit,
	setReferenceUnit,
}: TReferenceUnitForm) => {
	const availableReferenceUnits: TReferenceIngredientUnit[] = ["amount", "gram", "liter"];

	return (
		<div className="flex flex-col space-y-4">
			<p>Unité de référence : <HelperIcon text={"Un ingrédient peut être exprimé dans différentes unités (ex : grammes, litres, cuillères à soupe...) en fonction de la recette. Pour simplifier le calcul total des quantités, les quantités sont exprimées dans une unité unique, l'unité de \"référence\"."} /></p>
			<Select
				value={referenceUnit}
				onChange={event => setReferenceUnit(event.target.value)}
			>
				{
					availableReferenceUnits.map(availableReferenceUnit => {
						return (
							<MenuItem
								key={availableReferenceUnit}
								value={availableReferenceUnit}
							>
								{ingredientUnitAnnotationLabels[availableReferenceUnit]}
							</MenuItem>
						);
					})
				}
			</Select>
		</div>
	);
};