import { Route, Routes } from "react-router";
import { Navbar } from "../layout/Navbar/Navbar";
import { Home } from "../pages/Home/Home";
import { Ingredients } from "../pages/Ingredients/Ingredients";

export const Router = () => {
	return (
		<Routes>
			<Route element={<Navbar />}>
				<Route path="/" element={<Home />} />
				<Route path="/ingredients" element={<Ingredients />} />
			</Route>
		</Routes>
	);
};