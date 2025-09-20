/**
 * A generic unit category used to standardize ingredient measurements.
 * Specific units like "tablespoon" can be mapped to one of these.
 */
export type TIngredientUnitType = (
	"count" |
	"mass" |
	"volume"
)

/**
 * A specific ingredient unit that can be represented more generically using a reference unit.
 * For example, "tablespoon" can be expressed in liter.
 */
export type TIngredientUnit= (
	"count" |
	"gram" |
	"liter" |
	"pinch" |
	"tablespoon" |
	"teaspoon"
)

export type TUnitTypeConversionRates = Partial<Record<
	TIngredientUnitType,
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
	id:                      string
	name:                    string
	referenceUnitType:       TIngredientUnitType
	availableUnitTypes:      TIngredientUnitType[]
	unitTypeConversionRates: TUnitTypeConversionRates
	category:                TIngredientCategory
}