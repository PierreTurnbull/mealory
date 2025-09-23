import type { TTableColumn } from "../../../common/Table/table.types";

export const usePlanningColumns = () => {
	const columns: TTableColumn[] = [
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
		},
		{
			key:        "portions",
			label:      "Portions",
			isSortable: false,
			width:      "15px",
		},
		{
			key:                  "actions",
			label:                "",
			isSortable:           false,
			width:                "32px",
			paddingIsDisabled:    true,
			backgroundIsDisabled: true,
		},
	];

	return columns;
};