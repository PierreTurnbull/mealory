import type { TSortParameters, TTableColumn, TTableRow } from "./table.types";
import { TableHead } from "./TableHead/TableHead";
import { TableRow } from "./TableRow/TableRows";

type TTableProps = {
	columns:         TTableColumn[]
	rows:            TTableRow[]
	sortParameters?: TSortParameters | null
	onSort?:         (sortParameters: TSortParameters | null) => void
	fullWidth?:      boolean
	mustShowHeads?:  boolean
}

export const Table = ({
	columns,
	rows,
	sortParameters,
	onSort,
	fullWidth,
	mustShowHeads = true,
}: TTableProps) => {
	const sortedRows = sortParameters
		? [...rows].sort((a, b) => {
			let aValue = a.items.find(item => item.key === sortParameters.sortBy)!.value;
			let bValue = b.items.find(item => item.key === sortParameters.sortBy)!.value;

			if (sortParameters.sortDirection === "asc") {
				const tmp = aValue;

				aValue = bValue;
				bValue = tmp;
			}

			const getItemIsString = (item: unknown): item is string => typeof item === "string";
			const getItemIsNumber = (item: unknown): item is number => typeof item === "number";
			const getItemIsBoolean = (item: unknown): item is boolean => typeof item === "boolean";

			if (getItemIsString(aValue) && getItemIsString(bValue)) {
				return aValue.localeCompare(bValue);
			} else if (getItemIsNumber(aValue) && getItemIsNumber(bValue)) {
				return aValue - bValue;
			} else if (getItemIsBoolean(aValue) && getItemIsBoolean(bValue)) {
				return aValue ? 1 : -1;
			} else {
				throw new Error(`The sort function does not support type ${typeof aValue}.`);
			}
		})
		: rows;

	return (
		<table
			className={`
				border-separate
				border-spacing-1
				rounded
				bg-violet-100
				${fullWidth ? "w-full" : ""}
			`}
		>
			{
				mustShowHeads
					? (
						<thead>
							<TableHead
								columns={columns}
								sortParameters={sortParameters}
								onSort={onSort}
							/>
						</thead>
					)
					: null
			}
			<tbody>
				{
					sortedRows.map(row => {
						return (
							<TableRow
								key={row.key}
								row={row}
								columns={columns}
							/>
						);
					})
				}
			</tbody>
		</table>
	);
};