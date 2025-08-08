/**
 * A generic unit category used to standardize ingredient measurements.
 * Specific units like "tablespoon" can be mapped to one of these.
 */
export type TReferenceIngredientUnit = (
	"amount" |
	"mass" |
	"volume"
)

/**
 * A specific ingredient unit that can be represented more generically using a reference unit.
 * For example, "tablespoon" can be expressed in terms of volume.
 */
export type TAliasIngredientUnit = (
	"tablespoon" |
	"teaspoon"
)

export type TIngredientUnit = TReferenceIngredientUnit | TAliasIngredientUnit

export type TIngredient = {
	id:   number
	name: string
	unit: TReferenceIngredientUnit
}