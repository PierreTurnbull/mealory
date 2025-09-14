import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ingredientCategories } from "../../ingredientCategories";
import type { TIngredientFormData } from "../ingredientFormData.types";

type TCategoryFormProps = {
	category:    TIngredientFormData["category"]["value"]
	setCategory: (event: SelectChangeEvent<TIngredientFormData["category"]["value"]>,) => void
}

export const CategoryForm = ({
	category,
	setCategory,
}: TCategoryFormProps) => {
	const options = Object.entries(ingredientCategories).map(entry => {
		const option = {
			key:   entry[0],
			label: entry[1].label,
		};

		return option;
	});

	return (
		<>
			<p>Catégorie :</p>
			<Select
				value={category}
				onChange={event => setCategory(event)}
			>
				{
					options.map(option => {
						return (
							<MenuItem
								key={option.key}
								value={option.key}
							>
								{option.label}
							</MenuItem>
						);
					})
				}
			</Select>
		</>
	);
};