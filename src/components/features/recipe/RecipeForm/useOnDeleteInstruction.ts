import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnDeleteInstruction = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onInstructionDelete = (
		key: number,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.instructions.splice(key, 1);

			return next;
		});
	};

	return onInstructionDelete;
};