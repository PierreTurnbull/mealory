import type { TTableColumn } from "../../../common/Table/table.types";

export const useStockColumns = () => {
	const columns: TTableColumn[] = [
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
		},
		{
			key:        "totalNeeded",
			label:      "Total",
			isSortable: false,
		},
		{
			key:        "stock",
			label:      "Stock",
			isSortable: false,
			width:      "0",
		},
		{
			key:        "remainingToObtain",
			label:      "Besoin",
			isSortable: true,
		},
	];

	return columns;
};