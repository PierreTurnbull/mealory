import { getDefaultPlanningFormData } from "./getDefaultPlanningFormData";
import type { TPlanningFormData } from "./planningFormData.types";
							
export const useOnResetPlanning = (
	setRecipeFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
	setConfirmResetModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	return (
	) => {
		const defaultPlanningFormData = getDefaultPlanningFormData();

		setRecipeFormData(defaultPlanningFormData);
		setConfirmResetModalIsOpen(false);
	};
};