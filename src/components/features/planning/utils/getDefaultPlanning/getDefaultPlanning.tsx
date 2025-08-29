import type { TPlanning } from "../../planning.types";

export const getDefaultPlanning = () => {
	const defaultPlanning: Omit<TPlanning, "id"> = {
		recipes:             [],
		ingredientsInStock:  [],
		ingredientsObtained: [],
	};

	return defaultPlanning;
};
