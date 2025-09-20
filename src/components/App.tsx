/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { dbModelVersion } from "../db/dbModelVersion";
import { theme } from "../theme";
import { getIngredients, updateIngredient } from "./features/ingredient/ingredient.api";
import { NotificationsProvider } from "./features/notification/context/NotificationsProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { updateRecipe } from "./features/recipe/recipe.api";
import { Router } from "./router/Router";

function App() {
	const dbVersion = localStorage.dbVersion === undefined ? undefined : Number(localStorage.dbVersion);

	if (dbVersion === undefined) {
		localStorage.clear();
		localStorage.dbVersion = dbModelVersion;

		console.info(`Cleared database as it is not versioned. Now it is at version ${dbModelVersion}.`);
	}

	if (dbVersion === 1) {
		const ingredients = getIngredients();

		ingredients.forEach(ingredient => {
			ingredient.category = "other";
			updateIngredient(ingredient.id, ingredient);
		});

		localStorage.dbVersion = 2;
	}

	if (dbVersion === 2) {
		const backupName = `backup_${new Date().toISOString()}`;

		const backup = Object.fromEntries(Object.keys(localStorage)
			.filter(key => !key.includes("backup_"))
			.map(key => {
				const backupItem = JSON.parse(localStorage.getItem(key)!);

				return [key, backupItem];
			}));

		localStorage.setItem(backupName, JSON.stringify(backup));

		const ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]") as any;
		const recipes = JSON.parse(localStorage.getItem("recipes") || "[]") as any;

		ingredients.map((ingredient: any) => {
			if (ingredient.referenceUnit === "amount") {
				ingredient.referenceUnitType = "count";
			} else if (ingredient.referenceUnit === "gram") {
				ingredient.referenceUnitType = "mass";
			} else if (ingredient.referenceUnit === "liter") {
				ingredient.referenceUnitType = "volume";
			}

			ingredient.availableUnitTypes = ingredient.availableUnits.map((availableUnit: any) => {
				if (availableUnit === "amount") {
					return "count";
				} else {
					return availableUnit;
				}
			});

			ingredient.unitTypeConversionRates = {};
			Object.entries(ingredient.unitConversionRates).forEach(entry => {
				let key: string;

				if (entry[0] === "amount") {
					key = "count";
				} else {
					key = entry[0];
				}

				ingredient.unitTypeConversionRates[key] = entry[1];
			});

			delete ingredient.referenceUnit;
			delete ingredient.availableUnits;
			delete ingredient.unitConversionRates;

			return ingredient;
		});

		recipes.map((recipe: any) => {
			if (recipe.unit === "amount") {
				recipe.unit = "count";
			}

			return recipe;
		});

		ingredients.forEach((ingredient: any) => updateIngredient(ingredient.id, ingredient));
		recipes.forEach((recipe: any) => updateRecipe(recipe.id, recipe));

		localStorage.dbVersion = 3;
	}

	return (
		<NotificationsProvider>
			<ThemeProvider theme={theme}>
				<div
					className={`
							bg-slate-100
							min-h-screen
						`}
				>
					<Router />
					<Notifications />
				</div>
			</ThemeProvider>
		</NotificationsProvider>
	);
}

export default App;
