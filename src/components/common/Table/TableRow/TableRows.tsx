import type { TTableRow } from "../table.types";
import { TableCell } from "../TableCell/TableCell";

type TTableRowProps = {
	row: TTableRow
}

export const TableRow = ({
	row,
}: TTableRowProps) => {
	return (
		<tr
			key={row.key}
		>
			{
				row.items.map(item => {
					return (
						<TableCell
							key={item.key}
							isDisabled={row.isDisabled}
							isDimmed={row.isDimmed}
						>
							{item.label}
						</TableCell>
					);
				})
			}
		</tr>
	);
};