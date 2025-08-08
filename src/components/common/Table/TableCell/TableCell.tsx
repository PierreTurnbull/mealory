import type { ReactNode } from "react";

type TTableCellProps = {
	children:    ReactNode
	isDisabled?: boolean
	isDimmed?:   boolean
}

export const TableCell = ({
	children,
	isDisabled,
	isDimmed,
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

				${isDimmed ? "bg-gray-200" : ""}

				${isDisabled ? "bg-gray-200" : ""}
				${isDisabled ? "text-gray-500" : ""}
				${isDisabled ? "pointer-events-none" : ""}

				${(!isDisabled && !isDimmed) ? "bg-violet-200" : ""}
			`}
		>
			<span className="flex items-center h-full">
				{children}
			</span>
		</td>
	);
};