import type { TTableColumn } from "../../../common/Table/table.types";

export const useShoppingListColumns = () => {
	const shoppingListColumns: TTableColumn[] = [
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
		},
		{
			key:        "amount",
			label:      "Quantité",
			isSortable: false,
		},
		{
			key:                  "isObtained",
			label:                null,
			width:                "0",
			isSortable:           true,
			backgroundIsDisabled: true,
			paddingIsDisabled:    true,
		},
	];

	return shoppingListColumns;
};