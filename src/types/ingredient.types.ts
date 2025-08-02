export type TIngredientUnit = "count" | "mass" | "volume"

export type TIngredient = {
	id:    number
	label: string
	unit:  TIngredientUnit
}