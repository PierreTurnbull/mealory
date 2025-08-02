import type { TTableColumn, TTableRow } from "../../../types/table.types";
import { TableHead } from "./TableHead/TableHead";
import { TableRow } from "./TableRow/TableRows";

type TTableProps = {
	columns: TTableColumn[]
	rows:    TTableRow[]
}

export const Table = ({
	columns,
	rows,
}: TTableProps) => {
	return (
		<table
			className="border-separate border-spacing-1 rounded bg-violet-100"
		>
			<thead>
				<TableHead
					columns={columns}
				/>
			</thead>
			<tbody>
				{
					rows.map(row => {
						return (
							<TableRow
								key={row.key}
								row={row}
							/>
						);
					})
				}
			</tbody>
		</table>
	);
};