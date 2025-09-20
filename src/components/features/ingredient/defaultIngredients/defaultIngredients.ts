import type { TIngredient } from "../ingredient.types";

export const defaultIngredients: TIngredient[] = [
	{
		id:                      "f8362a9d-0600-4a51-81a1-31f0f1ccafe9",
		name:                    "Tomate",
		category:                "fruits and vegetables",
		referenceUnitType:       "count",
		availableUnitTypes:      ["count", "mass"],
		unitTypeConversionRates: {
			mass: 150,
		},
	},
	{
		id:                      "422b6f83-4a48-4d16-9245-124cf190b9ae",
		name:                    "Pomme de terre",
		category:                "fruits and vegetables",
		referenceUnitType:       "count",
		availableUnitTypes:      ["mass", "count"],
		unitTypeConversionRates: {
			mass: 200,
		},
	},
	{
		id:                      "60ddd794-963f-4a94-b721-b4eee5c5457f",
		name:                    "Carotte",
		category:                "fruits and vegetables",
		referenceUnitType:       "count",
		availableUnitTypes:      ["mass", "count"],
		unitTypeConversionRates: {
			mass: 100,
		},
	},
	{
		id:                      "cf16dc37-e0e4-4242-87cb-9ada4f013854",
		name:                    "Oignon",
		category:                "fruits and vegetables",
		referenceUnitType:       "count",
		availableUnitTypes:      ["count", "mass"],
		unitTypeConversionRates: {
			mass: 120,
		},
	},
	{
		id:                      "1d5682cc-12f4-4b23-9eda-63aff356a9b5",
		name:                    "Ail",
		category:                "fruits and vegetables",
		referenceUnitType:       "count",
		availableUnitTypes:      ["count", "mass"],
		unitTypeConversionRates: {
			mass: 5,
		},
	},
	{
		id:                      "f55e846f-c65a-4f12-820d-52ef30d67e93",
		name:                    "Œuf",
		category:                "dairy and eggs",
		referenceUnitType:       "count",
		availableUnitTypes:      ["count", "mass"],
		unitTypeConversionRates: {
			mass: 60,
		},
	},
	{
		id:                      "b4581d14-23a6-468e-b421-15425f1cffab",
		name:                    "Lait",
		category:                "dairy and eggs",
		referenceUnitType:       "volume",
		availableUnitTypes:      ["volume"],
		unitTypeConversionRates: {},
	},
	{
		id:                      "6b939c6e-c5c0-4608-8979-7a3c9125b819",
		name:                    "Beurre",
		category:                "dairy and eggs",
		referenceUnitType:       "mass",
		availableUnitTypes:      ["mass"],
		unitTypeConversionRates: {},
	},
	{
		id:                      "978dc437-fed4-4c43-8d5d-c35bada2c6e7",
		name:                    "Farine",
		category:                "pantry and dry goods",
		referenceUnitType:       "mass",
		availableUnitTypes:      ["mass", "volume"],
		unitTypeConversionRates: {
			volume: 1 / 500,
		},
	},
	{
		id:                      "ba1f6a69-ab05-4535-9bfa-64bc192ffd9d0",
		name:                    "Huile d'olive",
		category:                "condiments and sauces",
		referenceUnitType:       "volume",
		availableUnitTypes:      ["volume"],
		unitTypeConversionRates: {},
	},
	{
		id:                      "8fa1a9ca-80cd-49eb-92ff-cddf62b1fe271",
		name:                    "Sel",
		category:                "spices and herbs",
		referenceUnitType:       "mass",
		availableUnitTypes:      ["mass", "volume"],
		unitTypeConversionRates: {
			volume: 1 / 1250,
		},
	},
	{
		id:                      "12a91998-7499-4d40-8b1a-c0665e481f3c2",
		name:                    "Sucre",
		category:                "pantry and dry goods",
		referenceUnitType:       "mass",
		availableUnitTypes:      ["mass", "volume"],
		unitTypeConversionRates: {
			volume: 1 / 800,
		},
	},
];