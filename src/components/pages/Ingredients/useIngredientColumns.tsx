import type { TTableColumn } from "../../common/Table/table.types";

export const useIngredientColumns = () => {
	const columns: TTableColumn[] = [
		{
			key:        "name",
			label:      "Nom",
			isSortable: true,
		},
		{
			key:   "referenceUnit",
			label: (
				<>
					<span
						className="hidden sm:inline"
					>
						Unité de référence
					</span>
					<span
						className="sm:hidden inline"
					>
						Unité
					</span>
				</>
			),
			isSortable: true,
		},
		{
			key:   "actions",
			label: (
				<span
					className="hidden sm:inline"
				>
					Actions
				</span>
			),
			isSortable:           false,
			paddingIsDisabled:    true,
			width:                "0",
			backgroundIsDisabled: true,
		},
	];

	return columns;
};