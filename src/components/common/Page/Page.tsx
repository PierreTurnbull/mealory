import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { IconButton } from "../IconButton/IconButton";
import { Title } from "../Title/Title";

type TPageProps = {
	title:                    string
	children:                 ReactNode
	mustDisplayGoBackButton?: boolean
}

export const Page = ({
	title,
	children,
	mustDisplayGoBackButton = false,
}: TPageProps) => {
	const navigate = useNavigate();

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
					w-full
					p-4
					pt-8
					flex
					flex-col
					sm:w-[1000px]
					sm:max-w-[80%]
					sm:p-0
				`}
			>
				<div className="flex space-x-4">
					{
						mustDisplayGoBackButton
							? (
								<IconButton
									icon="‹"
									onClick={() => navigate(-1)}
								/>
							)
							: null
					}
					<Title title={title} />
				</div>
				{children}
			</div>
		</div>
	);
};