import { Navigate, Route, Routes } from "react-router";
import { Navbar } from "../features/layout/Navbar/Navbar";
import { DefaultPlanningWrapper } from "../features/planning/DefaultPlanningWrapper/DefaultPlanningWrapper";
import { Ingredients } from "../pages/Ingredients/Ingredients";
import { Planning } from "../pages/Planning/Planning";
import { Recipe } from "../pages/Recipe/Recipe";
import { Recipes } from "../pages/Recipes/Recipes";
import { ShoppingList } from "../pages/ShoppingList/ShoppingList";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Stock } from "../pages/Stock/Stock";

export const Router = () => {
	return (
		<Routes>
			<Route element={<Navbar />}>
				<Route path="/" element={<Navigate to="/planning"/>} />
				<Route path="/ingredients" element={<Ingredients />} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipes/:recipeId" element={<Recipe />} />
				<Route path="/planning" element={<DefaultPlanningWrapper><Planning /></DefaultPlanningWrapper>} />
				<Route path="/stock" element={<DefaultPlanningWrapper><Stock /></DefaultPlanningWrapper>} />
				<Route path="/shopping-list" element={<DefaultPlanningWrapper><ShoppingList /></DefaultPlanningWrapper>} />
			</Route>
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/sign-in" element={<SignIn />} />
		</Routes>
	);
};