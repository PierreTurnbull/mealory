import type { TTableColumn } from "../../../../types/table.types";

type TTableHeadProps = {
	columns: TTableColumn[]
}

export const TableHead = ({
	columns,
}: TTableHeadProps) => {
	return (
		<tr>
			{
				columns.map(column => {
					return (
						<th
							className="px-4 py-2 rounded bg-violet-300 text-left font-bold"
							key={column.key}
						>
							{column.label}
						</th>
					);
				})
			}
		</tr>
	);
};