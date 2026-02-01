import { v4 } from "uuid";
import { db } from "../../db/db.model";

/**
 * Returns generic CRUD APIs for the model name passed as param.
 */
export const getCrudApis = <T extends { id: string }>(
	modelName: string,
) => {
	const getItem = (
		id: T["id"],
	) => {
		const items = db.getItem(modelName)
			? JSON.parse(db.getItem(modelName)!) as T[]
			: [];

		const item = items.find(item => item.id === id);

		if (!item) {
			throw new Error(`Missing item with id ${id}.`);
		}

		return item;
	};

	const getItems = () => {
		const items = db.getItem(modelName)
			? JSON.parse(db.getItem(modelName)!) as T[]
			: [];

		return items;
	};

	const createItem = (
		item: Omit<T, "id"> | T,
	) => {
		const items = db.getItem(modelName)
			? JSON.parse(db.getItem(modelName)!) as T[]
			: [];

		const id = "id" in item ? item.id : v4();

		const itemWithId = {
			id: id,
			...item,
		} as T;

		items.push(itemWithId);

		db.setItem(modelName, JSON.stringify(items));

		return itemWithId;
	};

	const updateItem = (
		id: T["id"],
		nextItem: T,
	) => {
		const items = db.getItem(modelName)
			? JSON.parse(db.getItem(modelName)!) as T[]
			: [];

		const prevItemIndex = items.findIndex(item => item.id === id);

		if (prevItemIndex === -1) {
			throw new Error(`Missing item with id ${id}.`);
		}

		const prevItem = items[prevItemIndex];

		const item = {
			...prevItem,
			...nextItem,
		};

		items.splice(prevItemIndex, 1, item);

		db.setItem(modelName, JSON.stringify(items));

		return item;
	};

	const deleteItem = (
		id: T["id"],
	) => {
		const items = db.getItem(modelName)
			? JSON.parse(db.getItem(modelName)!) as T[]
			: [];

		const prevItemIndex = items.findIndex(item => item.id === id);

		if (prevItemIndex === -1) {
			throw new Error(`Missing item with id ${id}.`);
		}

		items.splice(prevItemIndex, 1);

		db.setItem(modelName, JSON.stringify(items));
	};

	return {
		getItem,
		getItems,
		createItem,
		updateItem,
		deleteItem,
	};
};