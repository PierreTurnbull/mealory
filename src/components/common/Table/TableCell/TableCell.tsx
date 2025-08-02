import type { ReactNode } from "react";

type TTableCellProps = {
	children: ReactNode
}

export const TableCell = ({
	children,
}: TTableCellProps) => {
	return (
		<td
			className="h-8 px-4 rounded bg-violet-200"
		>
			<span className="flex items-center h-full">
				{children}
			</span>
		</td>
	);
};