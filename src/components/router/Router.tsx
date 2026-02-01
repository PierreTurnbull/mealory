import { Navigate, Route, Routes } from "react-router";
import { Navbar } from "../features/layout/Navbar/Navbar";
import { DefaultPlanningWrapper } from "../features/planning/DefaultPlanningWrapper/DefaultPlanningWrapper";
import { ImportExport } from "../pages/ImportExport/ImportExport";
import { Ingredients } from "../pages/Ingredients/Ingredients";
import { Planning } from "../pages/Planning/Planning";
import { Recipe } from "../pages/Recipe/Recipe";
import { Recipes } from "../pages/Recipes/Recipes";
import { ShoppingList } from "../pages/ShoppingList/ShoppingList";
import { Stock } from "../pages/Stock/Stock";

export const Router = () => {
	return (
		<Routes>
			<Route element={<Navbar />}>
				<Route path="/" element={<Navigate to="/planning"/>} />
				<Route path="/ingredients" element={<Ingredients />} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipes/:recipeId" element={<Recipe />} />
				<Route element={<DefaultPlanningWrapper />}>
					<Route path="/planning" element={<Planning />} />
					<Route path="/stock" element={<Stock />} />
					<Route path="/shopping-list" element={<ShoppingList />} />
				</Route>
				<Route path="/import-export" element={<ImportExport />} />
			</Route>
		</Routes>
	);
};