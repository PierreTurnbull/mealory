import { createContext } from "react";
import type { TIngredientsContextState } from "./ingredientsContextState.type";

export const IngredientsContext = createContext<TIngredientsContextState|null>(null);