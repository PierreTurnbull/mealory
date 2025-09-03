import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { dbClient } from "../../../dbClient/dbClient";
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

	const checkUser = async () => {
		const { error } = await dbClient.auth.getUser();

		if (error) {
			navigate("/sign-in");
		}
	};

	checkUser();

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