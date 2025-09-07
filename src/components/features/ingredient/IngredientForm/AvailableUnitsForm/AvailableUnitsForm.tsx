import { Checkbox, FormControlLabel } from "@mui/material";
import { ingredientUnitAnnotationLabels } from "../../../../../utils/labels/ingredientUnits";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TIngredientUnit, TReferenceIngredientUnit } from "../../ingredient.types";
import type { TIngredientFormData } from "../ingredientFormData.types";

type TUnitsFormProps = {
	referenceUnit:     TReferenceIngredientUnit
	availableUnits:    TIngredientUnit[]
	setAvailableUnits: (value: TIngredientFormData["availableUnits"]["value"]) => void
}

export const AvailableUnitsForm = ({
	referenceUnit,
	availableUnits,
	setAvailableUnits,
}: TUnitsFormProps) => {
	const units: TIngredientUnit[] = ["amount", "gram", "liter", "pinch", "tablespoon", "teaspoon"];

	return (
		<div className="flex flex-col space-y-4">
			<p>Unités disponibles : <HelperIcon text="En plus de l'unité de référence, l'ingrédient peut être exprimé dans diverses unités." /></p>
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
											checked={referenceUnit === unit || availableUnits.includes(unit)}
											disabled={referenceUnit === unit}
											onChange={event => {
												const nextAvailableUnits = [...new Set([...availableUnits, unit])].filter(ingredientUnit => {
													if (ingredientUnit === unit) {
														return event.target.checked;
													}

													return true;
												});

												setAvailableUnits(nextAvailableUnits);
											}}
										/>
									}
									label={ingredientUnitAnnotationLabels[unit]}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};