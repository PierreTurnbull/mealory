import type { TPlanningFormData } from "./planningFormData.types";

export const getDefaultPlanningFormData = () => {
	const planningFormData: TPlanningFormData = {
		dishes: [],
		meals:  [],
	};

	return planningFormData;
};