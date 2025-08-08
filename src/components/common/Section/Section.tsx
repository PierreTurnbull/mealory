import type { ReactNode } from "react";

type TSectionProps = {
	children: ReactNode
}

export const Section = ({
	children,
}: TSectionProps) => {
	return (
		<div
			className="bg-violet-100 rounded p-4"
		>
			{children}
		</div>
	);
};