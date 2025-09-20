import { ingredientUnitRoundingPrecision } from "./ingredientUnits.model";

export const roundAmount = (amount: number) => {
	return Math.round(amount * (10 ** ingredientUnitRoundingPrecision)) / (10 ** ingredientUnitRoundingPrecision);
};