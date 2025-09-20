import { Input } from "@mui/material";
import { HelperIcon } from "../../../../common/HelperIcon/HelperIcon";
import type { TIngredientUnitType } from "../../ingredient.types";
import { ingredientUnitTypesConfig } from "../../ingredientUnits.model";
import type { TUnitTypeConversionRateInputValues } from "../ingredientFormData.types";
import type { useOnUnitTypeConversionRatesChange } from "../useOnUnitTypeConversionRatesChange";

type TConversionFormProps = {
	referenceUnitType:               TIngredientUnitType,
	unitTypeConversionRates:         TUnitTypeConversionRateInputValues
	onUnitTypeConversionRatesChange: ReturnType<typeof useOnUnitTypeConversionRatesChange>
}

export const ConversionForm = ({
	referenceUnitType,
	unitTypeConversionRates,
	onUnitTypeConversionRatesChange,
}: TConversionFormProps) => {
	return (
		<div className="space-y-4">
			<p>Table de conversion : <HelperIcon text="Les quantités exprimées dans une unité doivent être convertissables dans d'autres unités. Pour cela, il est nécessaire de définir des multiplicateurs permettant de calculer la valeur équivalente." /></p>
			<div className="space-y-2">
				{
					Object.entries(unitTypeConversionRates).map(entry => {
						const key = entry[0] as TIngredientUnitType;
						const value = entry[1];

						const aIngredientUnitTypeConfig = ingredientUnitTypesConfig[referenceUnitType];
						const aIngredientUnitConfig = aIngredientUnitTypeConfig.units[aIngredientUnitTypeConfig.referenceUnit]!;

						const bIngredientUnitTypeConfig = ingredientUnitTypesConfig[key];
						const bIngredientUnitConfig = bIngredientUnitTypeConfig.units[bIngredientUnitTypeConfig.referenceUnit]!;

						let aLabel: string;
						let bLabel: string;

						const isDensity = (
							(key === "mass" && referenceUnitType === "volume") ||
							(key === "volume" && referenceUnitType === "mass")
						);

						if (key === "count") {
							aLabel = bIngredientUnitConfig.label;
							bLabel = aIngredientUnitConfig[Number(value) >= 2 ? "labelPlural" : "label"];
						} else {
							aLabel = aIngredientUnitConfig.label;
							bLabel = bIngredientUnitConfig[Number(value) >= 2 ? "labelPlural" : "label"];
						}

						let rowEl = (
							<>
								<p className="text-nowrap">1 {aLabel.toLowerCase()} :</p>
								<div className="flex flex-row justify-start items-center gap-2">
									<Input
										style={{
											maxWidth: 60,
										}}
										type="number"
										value={value}
										onChange={event => onUnitTypeConversionRatesChange(event, key)}
									/>
									<p className="text-nowrap">{bLabel.toLowerCase()}</p>
								</div>
							</>
						);

						if (isDensity) {
							rowEl = (
								<>
									<p className="text-nowrap">Masse volumique :</p>
									<div className="flex flex-row justify-start items-center gap-2">
										<Input
											style={{
												maxWidth: 60,
											}}
											type="number"
											value={value}
											onChange={event => onUnitTypeConversionRatesChange(event, key)}
										/>
										<p className="text-nowrap">g/mL</p>
									</div>
								</>
							);
						}

						return (
							<div
								className="grid grid-cols-2 items-center"
								key={key}
							>
								{rowEl}
							</div>
						);
					})
				}
			</div>
		</div>
	);
};