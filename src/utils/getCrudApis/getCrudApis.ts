import { v4 } from "uuid";

/**
 * Returns generic CRUD APIs for the model name passed as param.
 */
export const getCrudApis = <T extends { id: number }>(
	modelName: string,
) => {
	const getItem = async (
		id: T["id"],
	) => {
		const items = localStorage[modelName]
			? JSON.parse(localStorage[modelName]) as T[]
			: [];

		const item = items.find(item => item.id === id);

		if (!item) {
			throw new Error(`Missing item with id ${id}.`);
		}

		return item;
	};

	const getItems = () => {
		const items = localStorage[modelName]
			? JSON.parse(localStorage[modelName]) as T[]
			: [];

		return items;
	};

	const createItem = (
		item: Omit<T, "id">,
	) => {
		const items = localStorage[modelName]
			? JSON.parse(localStorage[modelName]) as T[]
			: [];

		const itemWithId = {
			id: v4(),
			...item,
		} as T;

		items.push(itemWithId);

		localStorage[modelName] = JSON.stringify(items);

		return itemWithId;
	};

	const updateItem = (
		id: T["id"],
		nextItem: T,
	) => {
		const items = localStorage[modelName]
			? JSON.parse(localStorage[modelName]) as T[]
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

		localStorage[modelName] = JSON.stringify(items);

		return item;
	};

	const deleteItem = (
		id: T["id"],
	) => {
		const items = localStorage[modelName]
			? JSON.parse(localStorage[modelName]) as T[]
			: [];

		const prevItemIndex = items.findIndex(item => item.id === id);

		if (prevItemIndex === -1) {
			throw new Error(`Missing item with id ${id}.`);
		}

		items.splice(prevItemIndex, 1);

		localStorage[modelName] = JSON.stringify(items);
	};

	return {
		getItem,
		getItems,
		createItem,
		updateItem,
		deleteItem,
	};
};