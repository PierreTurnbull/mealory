import { Input } from "@mui/material";
import { ingredientUnitDirectObjectLabels, ingredientUnitDirectObjectSingularLabels } from "../../../../../utils/labels/ingredientUnits";
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
			<div className="space-y-2">
				{
					Object.entries(unitConversionRates).map(entry => {
						const key = entry[0] as TIngredientUnit;
						const value = entry[1];

						return (
							<div
								className="grid grid-cols-2 items-center"
								key={key}
							>
								<p className="text-nowrap">1 {ingredientUnitDirectObjectSingularLabels[key]} :</p>
								<div className="flex flex-row justify-start items-center gap-2">
									<Input
										style={{
											maxWidth: 60,
										}}
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
									<p className="text-nowrap">{ingredientUnitDirectObjectLabels[referenceUnit]}</p>
								</div>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};