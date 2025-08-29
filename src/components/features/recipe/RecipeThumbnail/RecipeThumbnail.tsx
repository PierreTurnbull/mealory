import { Link } from "react-router";
import { Title } from "../../../common/Title/Title";
import { DefaultRecipeImage } from "../../ingredient/DefaultRecipeImage/DefaultRecipeImage";
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
		<div className="flex flex-col justify-end">
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
								<div className="p-8 aspect-square h-full w-full flex">
									<DefaultRecipeImage />
								</div>
							)
					}
				</div>
			</Link>
		</div>
	);
};