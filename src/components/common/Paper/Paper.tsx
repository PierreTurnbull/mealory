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
				bg-slate-50
				overflow-hidden
			`}
		>
			{children}
		</div>
	);
};