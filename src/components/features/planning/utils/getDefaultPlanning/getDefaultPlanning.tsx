import { getPlanning } from "../getPlanning/getPlanning";

export const getDefaultPlanning = () => {
	const defaultStartDate = new Date();
	const defaultEndDate = new Date(defaultStartDate);
	defaultEndDate.setDate(defaultStartDate.getDate() + 6);

	return getPlanning(new Date(), defaultEndDate);
};
