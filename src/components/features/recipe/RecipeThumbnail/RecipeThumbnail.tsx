import { Link } from "react-router";
import { Title } from "../../../common/Title/Title";
import { DefaultIngredient } from "../../ingredient/DefaultIngredient";
import type { TRecipe } from "../recipe.types";

type TRecipeThumbnailProps = {
	id:       TRecipe["id"]
	name:     TRecipe["name"]
	imageUrl: TRecipe["imageUrl"]
}

export const RecipeThumbnail = ({
	id,
	name,
	imageUrl,
}: TRecipeThumbnailProps) => {
	return (
		<div>
			<Title
				title={name}
				rank="h4"
			/>
			<Link
				to={`/recipes/${id}`}
			>
				<div className="rounded bg-violet-200 hover:opacity-75">
					{
						imageUrl
							? (
								<img
									className="aspect-square object-cover w-full h-full rounded cursor-pointer"
									alt={`Thumbnail for recipe: ${name}.`}
									src={imageUrl}
								/>
							)
							: (
								<div className="p-8 h-full w-full flex">
									<DefaultIngredient />
								</div>
							)
					}
				</div>
			</Link>
		</div>
	);
};