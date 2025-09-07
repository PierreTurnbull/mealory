import { CircularProgress } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { dbClient } from "../../../dbClient/dbClient";
import { useIsMounted } from "../../../utils/useIsMounted/useIsMounted";
import { IconButton } from "../IconButton/IconButton";
import { Title } from "../Title/Title";

type TPageProps = {
	title:                    string
	children:                 ReactNode
	mustDisplayGoBackButton?: boolean
	isLoading?:               boolean
}

export const Page = ({
	title,
	children,
	mustDisplayGoBackButton = false,
	isLoading = false,
}: TPageProps) => {
	const navigate = useNavigate();

	const isMounted = useIsMounted();

	const checkUser = async () => {
		const { error } = await dbClient.auth.getUser();

		if (error) {
			navigate("/sign-in");
		}
	};

	if (!isMounted) {
		checkUser();
	}

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
				{
					isLoading
						? (
							<div className="absolute top-0 right-0 bottom-0 left-0">
								<div className="absolute top-0 right-0 bottom-0 left-0 bg-violet-50 opacity-50" />
								<CircularProgress
									className="absolute top-1/2 left-1/2 -translate-1/2"
									size={100}
								/>
							</div>
						)
						: null
				}
			</div>
		</div>
	);
};