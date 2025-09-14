import type { TIngredientCategory as TIngredientCategoryKey } from "./ingredient.types";

export type TIngredientCategory = {
	label: string
}

export const ingredientCategories: Record<TIngredientCategoryKey, TIngredientCategory> = {
	"fruits and vegetables": {
		label: "Fruits et légumes",
	},
	"meat and poultry": {
		label: "Viande et volaille",
	},
	"seafood and fish": {
		label: "Fruits de mer et poissons",
	},
	"dairy and eggs": {
		label: "Produits laitiers et œufs",
	},
	"bakery": {
		label: "Boulangerie",
	},
	"pantry and dry goods": {
		label: "Épicerie et produits secs",
	},
	"frozen": {
		label: "Produits surgelés",
	},
	"beverages": {
		label: "Boissons",
	},
	"snacks and sweets": {
		label: "Snacks et sucreries",
	},
	"condiments and sauces": {
		label: "Condiments et sauces",
	},
	"spices and herbs": {
		label: "Épices et herbes",
	},
	"cereals and breakfast": {
		label: "Céréales et petit-déjeuner",
	},
	"other": {
		label: "Autre",
	},
};