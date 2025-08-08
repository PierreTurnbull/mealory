import { v4 as uuid } from "uuid";
import type { TPlanning, TPlanningDay } from "../../planning.types";

export const getPlanning = (from: Date, to: Date) => {
	const defaultStartDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	const defaultEndDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());

	const startDate = new Date(defaultStartDate);
	const endDate = new Date(defaultEndDate);

	const daysCount = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60)) + 1;

	const planning: TPlanning = {
		id:           uuid(),
		startDate:    startDate,
		endDate:      endDate,
		planningDays: new Array(daysCount).fill(null).map(() => {
			const planningDay: TPlanningDay = {
				lunch: {
					recipeId: null,
				},
				dinner: {
					recipeId: null,
				},
			};

			return planningDay;
		}),
		ingredientsInStock:  [],
		ingredientsObtained: [],
	};

	return planning;
};