import type { TSortParameters, TTableColumn, TTableRow } from "./table.types";
import { TableHead } from "./TableHead/TableHead";
import { TableRow } from "./TableRow/TableRows";

type TTableProps = {
	columns:         TTableColumn[]
	rows:            TTableRow[]
	sortParameters?: TSortParameters | null
	onSort?:         (sortParameters: TSortParameters | null) => void
}

export const Table = ({
	columns,
	rows,
	sortParameters,
	onSort,
}: TTableProps) => {
	const sortedRows = sortParameters
		? [...rows].sort((a, b) => {
			const aValue = a.items.find(item => item.key === sortParameters.sortBy)!.value;
			const bValue = b.items.find(item => item.key === sortParameters.sortBy)!.value;

			const getItemIsString = (item: unknown): item is string => typeof item === "string";
			const getItemIsNumber = (item: unknown): item is number => typeof item === "number";

			if (getItemIsString(aValue) && getItemIsString(bValue)) {
				if (sortParameters.sortDirection === "asc") {
					return aValue.localeCompare(bValue);
				} else {
					return bValue.localeCompare(aValue);
				}
			} else if (getItemIsNumber(aValue) && getItemIsNumber(bValue)) {
				if (sortParameters.sortDirection === "asc") {
					return aValue - bValue;
				} else {
					return bValue - aValue;
				}
			} else {
				console.warn(`The sort function does not support type ${typeof aValue}.`);
			}

			return 0;
		})
		: rows;

	return (
		<table
			className="border-separate border-spacing-1 rounded bg-violet-100"
		>
			<thead>
				<TableHead
					columns={columns}
					sortParameters={sortParameters}
					onSort={onSort}
				/>
			</thead>
			<tbody>
				{
					sortedRows.map(row => {
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