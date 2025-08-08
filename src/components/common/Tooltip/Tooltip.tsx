import { useState, type ReactNode } from "react";

type TTooltipProps = {
	title:    string | ReactNode
	children: ReactNode
}

export const Tooltip = ({
	title,
	children,
}: TTooltipProps) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsActive(true)}
			onMouseLeave={() => setIsActive(false)}
			className="relative text-nowrap flex flex-col"
		>
			{children}
			{
				isActive
					? (
						<p
							className={`
								rounded
								bg-violet-950
								text-violet-50
								p-2
								text-sm
								absolute
								bottom-0
								left-1/2
								-translate-x-1/2
								translate-y-full
							`}
						>
							{title}
						</p>
					)
					: null
			}
		</div>
	);
};