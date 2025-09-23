import type { TPlanningFormData } from "./planningFormData.types";

export const useOnDishPortionsChange = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		id: string,
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const dishFormData = next.dishes.find(dishFormData => dishFormData.id === id)!;

			dishFormData.portions.value = event.target.value;

			return next;
		});
	};
};