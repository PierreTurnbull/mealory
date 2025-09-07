import { useContext } from "react";
import { IngredientsContext } from "./IngredientsContext";

export const useIngredientsContext = () => {
	const ingredientsContext = useContext(IngredientsContext);

	if (!ingredientsContext) {
		throw Error("Missing provider for IngredientsContext.");
	}

	return ingredientsContext;
};