import type { ReactNode } from "react";
import type { TButtonType } from "../Button/Button";

type TIconButtonProps = {
	icon:        string | ReactNode
	onClick?:    (event: React.MouseEvent) => void
	type?:       TButtonType
	isDisabled?: boolean
}

export const IconButton = ({
	icon,
	onClick,
	type = "primary",
	isDisabled,
}: TIconButtonProps) => {
	const _onClick = (event: React.MouseEvent) => {
		event.preventDefault();
		onClick?.(event);
	};

	return (
		<button
			disabled={isDisabled}
			className={`
				shadow
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

				rounded-md
				w-8
				h-8
				flex
				justify-center
				items-center
			`}
			onClick={_onClick}
		>
			{icon}
		</button>
	);
};