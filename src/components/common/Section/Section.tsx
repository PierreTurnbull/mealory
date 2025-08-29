import type { ReactNode } from "react";

type TSectionProps = {
	children:   ReactNode
	className?: string
}

export const Section = ({
	children,
	className,
}: TSectionProps) => {
	return (
		<div
			className={`
				bg-violet-100
				rounded p-4
				${className}
			`}
		>
			{children}
		</div>
	);
};