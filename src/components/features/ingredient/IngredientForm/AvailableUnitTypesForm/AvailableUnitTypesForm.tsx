import { Checkbox, FormControlLabel } from "@mui/material";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TIngredientUnitType } from "../../ingredient.types";
import { ingredientUnitTypesConfig } from "../../ingredientUnits.model";
import type { TIngredientFormData } from "../ingredientFormData.types";

type TUnitsFormProps = {
	referenceUnitType:     TIngredientUnitType
	availableUnitTypes:    TIngredientUnitType[]
	setAvailableUnitTypes: (value: TIngredientFormData["availableUnitTypes"]["value"]) => void
}

export const AvailableUnitTypesForm = ({
	referenceUnitType,
	availableUnitTypes,
	setAvailableUnitTypes,
}: TUnitsFormProps) => {
	const units: TIngredientUnitType[] = ["count", "mass", "volume"];

	return (
		<div className="flex flex-col space-y-4">
			<p>Types d'unités disponibles : <HelperIcon text="En plus du type d'unité de référence, l'ingrédient peut être exprimé dans d'autres types d'unités." /></p>
			<div>
				{
					units.map(unit => {
						return (
							<div
								key={unit}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={referenceUnitType === unit || availableUnitTypes.includes(unit)}
											disabled={referenceUnitType === unit}
											onChange={event => {
												const nextAvailableUnitTypes = [...new Set([...availableUnitTypes, unit])].filter(ingredientUnitType=> {
													if (ingredientUnitType=== unit) {
														return event.target.checked;
													}

													return true;
												});

												setAvailableUnitTypes(nextAvailableUnitTypes);
											}}
										/>
									}
									label={ingredientUnitTypesConfig[unit].label}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};