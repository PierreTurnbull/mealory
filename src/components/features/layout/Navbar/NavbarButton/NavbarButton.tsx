import { IconButton } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import colors from "tailwindcss/colors";

type TNavbarButtonProps = {
	icon: ReactNode
	url:  string
}

export const NavbarButton = ({
	icon,
	url,
}: TNavbarButtonProps) => {
	const navigate = useNavigate();

	return (
		<IconButton
			style={{
				height:          "100%",
				backgroundColor: "transparent",
				flexGrow:        1,
				color:           location.pathname.replace("/mealory", "") === url ? colors.violet[500] : colors.violet[950],
			}}
			onClick={() => navigate(url)}
		>
			{icon}
		</IconButton>
	);
};