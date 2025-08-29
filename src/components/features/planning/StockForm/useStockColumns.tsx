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
			isSortable: true,
		},
		{
			key:        "stock",
			label:      "Stock",
			isSortable: true,
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