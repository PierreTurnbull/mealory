import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Button } from "../../common/Button/Button";

export const Navbar = () => {
	const navigate = useNavigate();

	const mobileMenuRef = useRef<HTMLDivElement | null>(null);
	const [mobileMenuOffset, setMobileMenuOffset] = useState(0);

	useEffect(() => {
		setMobileMenuOffset(mobileMenuRef.current!.clientHeight);
	}, [setMobileMenuOffset]);

	return (
		<div>
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
					onClick={() => navigate("/")}
				>
					Accueil
				</Button>
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
					onClick={() => navigate("/stocks")}
				>
					Préparation des courses
				</Button>
				<Button
					onClick={() => navigate("/shopping-list")}
				>
					Liste de courses
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
					grid
					grid-cols-6
					gap-4
					p-4
					bg-gray-50
				`}
			>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/")}
				>
					🏠
				</div>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/ingredients" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/ingredients")}
				>
					🥄
				</div>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/recipes" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/recipes")}
				>
					📖
				</div>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/planning" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/planning")}
				>
					📅
				</div>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/stocks" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/stocks")}
				>
					📦
				</div>
				<div
					className={`
						rounded
						shadow
						aspect-square
						text-[7vw]
						flex
						justify-center
						items-center
						select-none
						${location.pathname === "/shopping-list" ? "bg-violet-200" : "bg-gray-50"}
					`}
					onClick={() => navigate("/shopping-list")}
				>
					🧺
				</div>
			</div>
		</div>
	);
};