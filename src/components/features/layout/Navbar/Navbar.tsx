import BookIcon from "@mui/icons-material/Book";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KitchenIcon from "@mui/icons-material/Kitchen";
import SetMealIcon from "@mui/icons-material/SetMeal";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Button } from "../../../common/Button/Button";
import { BuildVersion } from "../BuildVersion/BuildVersion";
import { NavbarButton } from "./NavbarButton/NavbarButton";

export const Navbar = () => {
	const navigate = useNavigate();

	const mobileMenuRef = useRef<HTMLDivElement | null>(null);
	const [mobileMenuOffset, setMobileMenuOffset] = useState(0);

	useEffect(() => {
		setMobileMenuOffset(mobileMenuRef.current!.clientHeight);
	}, [setMobileMenuOffset]);

	return (
		<div>
			<BuildVersion />
			<div
				className={`
					space-x-2
					justify-center
					p-4
					hidden
					sm:flex
				`}
			>
				<Button
					onClick={() => navigate("/ingredients")}
				>
					Liste d'ingrédients
				</Button>
				<Button
					onClick={() => navigate("/recipes")}
				>
					Liste de recettes
				</Button>
				<Button
					onClick={() => navigate("/planning")}
				>
					Planning
				</Button>
				<Button
					onClick={() => navigate("/stock")}
				>
					Préparation des courses
				</Button>
				<Button
					onClick={() => navigate("/shopping-list")}
				>
					Liste de courses
				</Button>
				<Button
					onClick={() => navigate("/synchronization")}
				>
					Synchronisation
				</Button>
			</div>
			<div
				style={{
					paddingBottom: mobileMenuOffset,
				}}
			>
				<Outlet />
			</div>
			<div
				ref={mobileMenuRef}
				className={`
					shadow-lg
					sm:hidden
					fixed
					bottom-0
					left-0
					right-0
					flex
					justify-between
					px-4
					bg-slate-50
					h-16
					z-10
				`}
			>
				<NavbarButton url="/ingredients" icon={<SetMealIcon />} />
				<NavbarButton url="/recipes" icon={<BookIcon />} />
				<NavbarButton url="/planning" icon={<CalendarTodayIcon />} />
				<NavbarButton url="/stock" icon={<KitchenIcon />} />
				<NavbarButton url="/shopping-list" icon={<ShoppingBasketIcon />} />
				<NavbarButton url="/synchronization" icon={<ImportExportIcon />} />
			</div>
		</div>
	);
};