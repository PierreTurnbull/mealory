import { getCrudApis } from "../../../utils/getCrudApis/getCrudApis";
import type { TIngredient } from "./ingredient.types";

const ingredientApis = getCrudApis<TIngredient>("ingredients");

export const getIngredient = ingredientApis.getItem;
export const getIngredients = ingredientApis.getItems;
export const createIngredient = ingredientApis.createItem;
export const updateIngredient = ingredientApis.updateItem;
export const deleteIngredient = ingredientApis.deleteItem;