import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnSwapInstructions = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onSwapInstructions = (
		keyA: number,
		keyB: number,
	) => {
		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.instructions.splice(keyA, 1, prev.instructions[keyB]);
			next.instructions.splice(keyB, 1, prev.instructions[keyA]);

			return next;
		});
	};

	return onSwapInstructions;
};