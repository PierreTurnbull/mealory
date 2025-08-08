import { Route, Routes } from "react-router";
import { Navbar } from "../layout/Navbar/Navbar";
import { Home } from "../pages/Home/Home";
import { Ingredients } from "../pages/Ingredients/Ingredients";
import { Planning } from "../pages/Planning/Planning";
import { Recipe } from "../pages/Recipe/Recipe";
import { Recipes } from "../pages/Recipes/Recipes";
import { ShoppingList } from "../pages/ShoppingList/ShoppingList";
import { Stocks } from "../pages/Stocks/Stocks";

export const Router = () => {
	return (
		<Routes>
			<Route element={<Navbar />}>
				<Route path="/" element={<Home />} />
				<Route path="/ingredients" element={<Ingredients />} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipes/:recipeId" element={<Recipe />} />
				<Route path="/planning" element={<Planning />} />
				<Route path="/stocks" element={<Stocks />} />
			</Route>
			<Route path="/shopping-list" element={<ShoppingList />} />
		</Routes>
	);
};