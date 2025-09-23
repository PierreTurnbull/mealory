import type { TPlanningFormData } from "./planningFormData.types";

export const useOnRemoveMeal = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		id: string,
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const key = next.meals.findIndex(mealFormData => mealFormData.id === id)!;
			next.meals.splice(key, 1);

			return next;
		});
	};
};