import { Outlet, useNavigate } from "react-router";
import { Button } from "../../common/Button/Button";

export const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div>
			<div className="space-x-2 flex justify-center p-4">
				<Button
					onClick={() => navigate("/")}
				>
					Accueil
				</Button>
				<Button
					onClick={() => navigate("/ingredients")}
				>
					Liste de recettes
				</Button>
			</div>
			<Outlet />
		</div>
	);
};