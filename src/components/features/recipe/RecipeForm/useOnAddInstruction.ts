import type { TRecipeFormData } from "./recipeFormData.types";

export const useOnAddInstruction = (
	setRecipeFormData: React.Dispatch<React.SetStateAction<TRecipeFormData>>,
) => {
	const onAddInstruction = () => {
		const newInstructionFormData: TRecipeFormData["instructions"][number] = {
			value: "",
		};

		setRecipeFormData(prev => {
			const next = structuredClone(prev);

			next.instructions.push(newInstructionFormData);

			return next;
		});
	};

	return onAddInstruction;
};