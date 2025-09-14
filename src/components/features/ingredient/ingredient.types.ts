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
 * For example, "tablespoon" can be expressed in liter.
 */
export type TAliasIngredientUnit = (
	"pinch" |
	"tablespoon" |
	"teaspoon"
)

export type TIngredientUnit = TReferenceIngredientUnit | TAliasIngredientUnit

export type TUnitConversionRates = Partial<Record<
	TIngredientUnit,
	number
>>

export type TIngredientCategory = (
	"fruits and vegetables" |
	"meat and poultry" |
	"seafood and fish" |
	"dairy and eggs" |
	"bakery" |
	"pantry and dry goods" |
	"frozen" |
	"beverages" |
	"snacks and sweets" |
	"condiments and sauces" |
	"spices and herbs" |
	"cereals and breakfast" |
	"other"
)

export type TIngredient = {
	id:                  string
	name:                string
	referenceUnit:       TReferenceIngredientUnit
	availableUnits:      TIngredientUnit[]
	unitConversionRates: TUnitConversionRates
	category:            TIngredientCategory
}