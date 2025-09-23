import type { TPlanningFormData } from "./planningFormData.types";

export const useOnRemoveDish = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		id: string,
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			const key = next.dishes.findIndex(dishFormData => dishFormData.id === id)!;
			next.dishes.splice(key, 1);

			return next;
		});
	};
};