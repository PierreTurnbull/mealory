import type { TPlanningFormData } from "./planningFormData.types";

export const useOnPortionsChange = (
	setPlanningFormData: (value: React.SetStateAction<TPlanningFormData>) => void,
) => {
	return (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		key: number,
	) => {
		setPlanningFormData(prev => {
			const next = structuredClone(prev);

			next.recipes[key].portions.value = event.target.value;

			return next;
		});
	};
};