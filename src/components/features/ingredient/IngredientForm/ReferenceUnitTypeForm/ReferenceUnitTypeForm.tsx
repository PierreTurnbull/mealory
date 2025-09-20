import { MenuItem, Select } from "@mui/material";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TIngredientUnitType } from "../../ingredient.types";
import { ingredientUnitTypesConfig } from "../../ingredientUnits.model";
import type { TIngredientFormData } from "../ingredientFormData.types";

type TReferenceUnitTypeForm = {
	referenceUnitType:    TIngredientFormData["referenceUnitType"]["value"],
	setReferenceUnitType: (value: TIngredientFormData["referenceUnitType"]["value"]) => void
}

export const ReferenceUnitTypeForm = ({
	referenceUnitType,
	setReferenceUnitType,
}: TReferenceUnitTypeForm) => {
	const availableReferenceUnitTypes: TIngredientUnitType[] = ["count", "mass", "volume"];

	return (
		<div className="flex flex-col space-y-4">
			<p>Type d'unité de référence : <HelperIcon text={"Un ingrédient peut être exprimé en nombre, en masse ou en volume en fonction de la recette. Pour simplifier le calcul total des quantités, les quantités sont exprimées dans un seul type d'unité, le type d'unité de \"référence\"."} /></p>
			<Select
				value={referenceUnitType}
				onChange={event => setReferenceUnitType(event.target.value)}
			>
				{
					availableReferenceUnitTypes.map(availableReferenceUnitType => {
						return (
							<MenuItem
								key={availableReferenceUnitType}
								value={availableReferenceUnitType}
							>
								{ingredientUnitTypesConfig[availableReferenceUnitType].label}
							</MenuItem>
						);
					})
				}
			</Select>
		</div>
	);
};