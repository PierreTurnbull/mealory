import { getCrudApis } from "../../../utils/getCrudApis/getCrudApis";
import type { TPlanning } from "./planning.types";

const planningApis = getCrudApis<TPlanning>("plannings");

export const getPlanning = planningApis.getItem;
export const getPlannings = planningApis.getItems;
export const createPlanning = planningApis.createItem;
export const updatePlanning = planningApis.updateItem;
export const deletePlanning = planningApis.deleteItem;