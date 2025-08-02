import type { ReactNode } from "react";

type TButtonType = "primary" | "secondary"

type TButtonProps = {
	onClick?: (event: React.MouseEvent) => void
	children: ReactNode
	type?:    TButtonType
}

export const Button = ({
	onClick,
	children,
	type = "primary",
}: TButtonProps) => {
	const _onClick = (event: React.MouseEvent) => {
		event.preventDefault();
		onClick?.(event);
	};

	return (
		<button
			onClick={_onClick}
			className={`
				rounded
				${type === "primary" ? `
					bg-violet-500
					hover:bg-violet-400
					text-violet-50
				` : ""}
				${type === "secondary" ? `
					bg-violet-200
					hover:bg-violet-100
					text-violet-950
				` : ""}
				px-4
				py-2
				cursor-pointer
			`}
		>
			{children}
		</button>
	);
};