import { useState } from "react";
import { Table } from "../../../common/Table/Table";
import type { TSortParameters } from "../../../common/Table/table.types";
import type { TPlanning } from "../planning.types";
import { useOnIsObtainedChange } from "./useOnIsObtainedChange";
import { useShoppingListRows } from "./useShopingListRows";
import { useShoppingListColumns } from "./useShoppingListColumns";
import { useShoppingListFormData } from "./useShoppingListFormData";
import { useSyncShoppingListFormDataAndShoppingList } from "./useSyncShoppingListFormDataAndShoppingList";

type TShoppingListFormProps<T> = {
	planning:    T
	setPlanning: React.Dispatch<React.SetStateAction<T>>
}

export const ShoppingListForm = <T extends TPlanning | Omit<TPlanning, "id">>({
	planning,
	setPlanning,
}: TShoppingListFormProps<T>) => {
	const [shoppingListFormData, setShoppingListFormData] = useShoppingListFormData(planning);

	const onIsObtainedChange = useOnIsObtainedChange(setShoppingListFormData);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>(null);

	const shoppingListColumns = useShoppingListColumns();
	const shoppingListRows = useShoppingListRows(planning, shoppingListFormData, onIsObtainedChange);

	useSyncShoppingListFormDataAndShoppingList(shoppingListFormData, setPlanning);

	return (
		<Table
			fullWidth
			columns={shoppingListColumns}
			sortParameters={sortParameters}
			onSort={setSortParameters}
			rows={shoppingListRows}
			mustShowHeads={false}
		/>
	);
};