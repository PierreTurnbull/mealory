import type { ReactNode } from "react";
import type { TTableColumn, TTableItem, TTableRow } from "../table.types";

type TTableCellProps = {
	children: ReactNode
	item:     TTableItem,
	row:      TTableRow
	column:   TTableColumn
}

export const TableCell = ({
	children,
	item,
	row,
	column,
}: TTableCellProps) => {
	return (
		<td
			className={`
				h-8
				px-2
				sm:px-4
				rounded
				relative
				align-top

				${row.isDimmed ? "bg-slate-200" : ""}

				${row.isDisabled ? "bg-slate-200" : ""}
				${row.isDisabled ? "text-slate-500" : ""}
				${row.isDisabled ? "pointer-events-none" : ""}

				${(!row.isDisabled && !row.isDimmed) ? "bg-violet-200" : ""}

				${column.paddingIsDisabled || item.paddingIsDisabled ? "px-0! sm:px-0!" : ""}

				${column.backgroundIsDisabled ? "bg-transparent!" : ""}
			`}
			style={{
				width: column.width,
			}}
		>
			<span className="flex items-center h-full">
				{children}
			</span>
		</td>
	);
};