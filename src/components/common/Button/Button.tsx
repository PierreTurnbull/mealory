import type { ReactNode } from "react";
import { Tooltip } from "../Tooltip/Tooltip";

export type TButtonType = "primary" | "secondary" | "danger"

type TButtonSize = "md" | "sm"

type TButtonProps = {
	onClick?:    (event: React.MouseEvent) => void
	children:    ReactNode
	type?:       TButtonType
	size?:       TButtonSize
	isDisabled?: boolean
	tooltip?:    string | null
}

export const Button = ({
	onClick,
	children,
	type = "primary",
	size = "md",
	isDisabled = false,
	tooltip,
}: TButtonProps) => {
	const _onClick = (event: React.MouseEvent) => {
		event.preventDefault();
		onClick?.(event);
	};

	const buttonEl = (
		<button
			onClick={_onClick}
			disabled={isDisabled}
			className={`
				shadow
				rounded
				px-2
				sm:px-4

				${!isDisabled && type === "primary" ? `
					bg-violet-500
					hover:bg-violet-400
					text-violet-50
				` : ""}
				${!isDisabled && type === "secondary" ? `
					bg-violet-200
					hover:bg-violet-100
					text-violet-950
				` : ""}
				${!isDisabled && type === "danger" ? `
					bg-red-500
					hover:bg-red-400
					text-red-50
				` : ""}

				${isDisabled ? `
					bg-gray-200
					text-gray-500
					cursor-auto
				` : `
					cursor-pointer
				`}

				${size === "md" ? `
					min-h-8
				` : ""}
				${size === "sm" ? `
					min-h-6
				` : ""}
			`}
		>
			{children}
		</button>
	);

	return (
		tooltip
			? (
				<Tooltip title={tooltip}>
					{buttonEl}
				</Tooltip>
			)
			: buttonEl
	);
};