/**
 * A generic unit category used to standardize ingredient measurements.
 * Specific units like "tablespoon" can be mapped to one of these.
 */
export type TReferenceIngredientUnit = (
	"amount" |
	"gram" |
	"liter"
)

/**
 * A specific ingredient unit that can be represented more generically using a reference unit.
 * For example, "tablespoon" can be expressed in terms of liter.
 */
export type TAliasIngredientUnit = (
	"tablespoon" |
	"teaspoon"
)

export type TIngredientUnit = TReferenceIngredientUnit | TAliasIngredientUnit

export type TIngredientAvailableUnit = {
	unit:           TIngredientUnit
	conversionRate: number
}

export type TIngredient = {
	id:             number
	name:           string
	referenceUnit:  TReferenceIngredientUnit
	availableUnits: TIngredientAvailableUnit[]
}