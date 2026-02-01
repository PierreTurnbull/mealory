import { CircularProgress, Tooltip } from "@mui/material";
import type { ReactNode } from "react";

export type TButtonType = "primary" | "secondary" | "danger"

type TButtonSize = "md" | "sm"

type TButtonProps = {
	onClick?:    (event: React.MouseEvent) => void
	children:    ReactNode
	type?:       TButtonType
	size?:       TButtonSize
	isDisabled?: boolean
	isLoading?:  boolean
	tooltip?:    string | null
}

export const Button = ({
	onClick,
	children,
	type = "primary",
	size = "md",
	isDisabled = false,
	isLoading = false,
	tooltip,
}: TButtonProps) => {
	const _onClick = (event: React.MouseEvent) => {
		event.preventDefault();
		onClick?.(event);
	};

	const buttonEl = (
		<button
			onClick={_onClick}
			disabled={isDisabled || isLoading}
			className={`
				relative
				shadow
				rounded
				px-2
				sm:px-4

				${!isDisabled && !isLoading && type === "primary" ? `
					bg-violet-500
					hover:bg-violet-400
					text-violet-50
				` : ""}
				${!isDisabled && !isLoading && type === "secondary" ? `
					bg-violet-200
					hover:bg-violet-100
					text-violet-950
				` : ""}
				${!isDisabled && !isLoading && type === "danger" ? `
					bg-red-500
					hover:bg-red-400
					text-red-50
				` : ""}

				${isDisabled || isLoading ? `
					bg-slate-200
					text-slate-500
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
			<span className={`${isLoading ? "opacity-0" : ""}`}>{children}</span>
			{
				isLoading
					? <CircularProgress size="16px" className="absolute left-1/2 top-1/2 -translate-1/2" />
					: null
			}
		</button>
	);

	return (
		tooltip
			? (
				<Tooltip title={tooltip}>
					<div>
						{buttonEl}
					</div>
				</Tooltip>
			)
			: buttonEl
	);
};