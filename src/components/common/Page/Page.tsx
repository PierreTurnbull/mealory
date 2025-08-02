import type { ReactNode } from "react";
import { Title } from "../Title/Title";

type TPageProps = {
	title:    string
	children: ReactNode
}

export const Page = ({
	title,
	children,
}: TPageProps) => {
	return (
		<div
			className={`
				flex
				flex-col
				items-center
			`}
		>
			<div
				className={`
					w-[1000px]
					max-w-[80%]
					flex
					flex-col
				`}
			>
				<Title title={title} />
				{children}
			</div>
		</div>
	);
};