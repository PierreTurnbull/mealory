import type { ReactNode } from "react";

type TPaperProps = {
	children: ReactNode
}

export const Paper = ({
	children,
}: TPaperProps) => {
	return (
		<div
			className={`
				shadow-lg
				rounded-md
				bg-gray-50
			`}
		>
			{children}
		</div>
	);
};