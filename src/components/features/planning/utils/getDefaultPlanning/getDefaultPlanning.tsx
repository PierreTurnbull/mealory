import type { TPlanning } from "../../planning.types";

export const getDefaultPlanning = () => {
	const defaultPlanning: Omit<TPlanning, "id"> = {
		dishes:              [],
		meals:               [],
		ingredientsInStock:  [],
		ingredientsObtained: [],
	};

	return defaultPlanning;
};
