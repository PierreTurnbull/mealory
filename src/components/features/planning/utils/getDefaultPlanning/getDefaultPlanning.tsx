import type { TPlanning } from "../../planning.types";

export const getDefaultPlanning = () => {
	const defaultPlanning: Omit<TPlanning, "id"> = {
		dishes:             [],
		ingredientsInStock:  [],
		ingredientsObtained: [],
	};

	return defaultPlanning;
};
