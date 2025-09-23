import type { TPlanningFormData } from "./planningFormData.types";

export const useOnMealPortionsChange = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		id: string,
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const mealFormData = next.meals.find(mealFormData => mealFormData.id === id)!;

			mealFormData.portions.value = event.target.value;

			return next;
		});
	};
};