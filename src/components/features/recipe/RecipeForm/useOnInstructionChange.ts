import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnInstructionChange = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onInstructionChange = (
		key: number,
		value: TRecipeFormData["instructions"][number]["value"],
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.instructions[key].value = value;

			return next;
		});
	};

	return onInstructionChange;
};