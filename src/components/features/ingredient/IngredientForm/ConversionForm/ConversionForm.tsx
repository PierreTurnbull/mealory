import { Input } from "@mui/material";
import { ingredientUnitAnnotationLabels, ingredientUnitDirectObjectSingularLabels } from "../../../../../utils/labels/ingredientUnits";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TIngredientUnit, TReferenceIngredientUnit } from "../../ingredient.types";
import type { TIngredientFormData, TUnitConversionRateInputValues } from "../ingredientFormData.types";

type TConversionFormProps = {
	referenceUnit:          TReferenceIngredientUnit,
	unitConversionRates:    TUnitConversionRateInputValues
	setUnitConversionRates: (value: TIngredientFormData["unitConversionRates"]["value"]) => void
}

export const ConversionForm = ({
	referenceUnit,
	unitConversionRates,
	setUnitConversionRates,
}: TConversionFormProps) => {
	return (
		<div className="space-y-4">
			<p>Table de conversion : <HelperIcon text="Les quantités exprimées dans une unité doivent être convertissables dans d'autres unités. Pour cela, il est nécessaire de définir des multiplicateurs permettant de calculer la valeur équivalente." /></p>
			<p>1 {ingredientUnitDirectObjectSingularLabels[referenceUnit]} =</p>
			<div className="space-y-2">
				{
					Object.entries(unitConversionRates).map(entry => {
						const key = entry[0] as TIngredientUnit;
						const value = entry[1];

						return (
							<div
								className="flex justify-between items-center gap-2"
								key={key}
							>
								<p>{ingredientUnitAnnotationLabels[key]} :</p>
								<Input
									type="number"
									value={value}
									onChange={event => {
										if (Number(event.target.value) < 0) {
											return;
										}

										const nextUnitConversionRates = structuredClone(unitConversionRates);
										nextUnitConversionRates[key] = event.target.value;
										setUnitConversionRates(nextUnitConversionRates);
									}}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};