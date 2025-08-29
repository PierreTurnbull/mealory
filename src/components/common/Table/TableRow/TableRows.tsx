import type { TTableColumn, TTableRow } from "../table.types";
import { TableCell } from "../TableCell/TableCell";

type TTableRowProps = {
	row:     TTableRow
	columns: TTableColumn[]
}

export const TableRow = ({
	row,
	columns,
}: TTableRowProps) => {
	return (
		<tr
			key={row.key}
		>
			{
				row.items.map(item => {
					const column = columns.find(column => column.key === item.key)!;

					return (
						<TableCell
							key={item.key}
							item={item}
							row={row}
							column={column}
						>
							{item.label}
						</TableCell>
					);
				})
			}
		</tr>
	);
};