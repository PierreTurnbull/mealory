import { getCrudApis } from "../../../utils/getCrudApis/getCrudApis";
import type { TRecipe } from "./recipe.types";

const recipeApis = getCrudApis<TRecipe>("recipes");

export const getRecipe = recipeApis.getItem;
export const getRecipes = recipeApis.getItems;
export const createRecipe = recipeApis.createItem;
export const updateRecipe = recipeApis.updateItem;
export const deleteRecipe = recipeApis.deleteItem;