import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { ingredientUnitDirectObjectLabels } from "../../../utils/labels/ingredientUnits";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { TextField } from "../../common/TextField/TextField";
import type { TIngredient } from "../../features/ingredient/ingredient.types";
import { useNotificationContext } from "../../features/notification/context/useNotificationContext";
import type { TPlanning } from "../../features/planning/planning.types";
import { getDefaultPlanning } from "../../features/planning/utils/getDefaultPlanning/getDefaultPlanning";
import { getTotalIngredients } from "../../features/planning/utils/getTotalIngredients/getTotalIngredients";
import { getTotalIngredientsMinusStocks } from "../../features/planning/utils/getTotalIngredientsMinusStocks/getTotalIngredientsMinusStocks";
import type { TRecipe } from "../../features/recipe/recipe.types";

export const Stocks = () => {
	const notificationContext = useNotificationContext();
	const navigate = useNavigate();

	const ingredients: TIngredient[] = localStorage.ingredients
		? JSON.parse(localStorage.ingredients) as TIngredient[]
		: [];
	const recipes: TRecipe[] = localStorage.recipes
		? JSON.parse(localStorage.recipes) as TRecipe[]
		: [];
	const planning: TPlanning = localStorage.planning
		? JSON.parse(localStorage.planning) as TPlanning
		: getDefaultPlanning();

	const [ingredientsInStock, setIngredientsInStock] = useState(planning.ingredientsInStock);

	const totalIngredients = getTotalIngredients(ingredients, recipes, planning);

	const totalIngredientsMinusStocks = getTotalIngredientsMinusStocks(totalIngredients, ingredientsInStock);

	return (
		<Page
			title="Préparation des courses"
			mustDisplayGoBackButton
		>
			<div className="flex flex-col items-center gap-4">
				<div
					className="flex gap-2"
				>
					<Button
						onClick={() => {
							const planning: TPlanning = localStorage.planning
								? JSON.parse(localStorage.planning) as TPlanning
								: getDefaultPlanning();

							planning.ingredientsInStock = ingredientsInStock;

							localStorage.planning = JSON.stringify(planning);

							notificationContext.addNotification("Les stocks ont été sauvegardés.", "success");
						}}
					>
						Sauvegarder
					</Button>
					<Button
						type="secondary"
						onClick={() => navigate("/shopping-list")}
					>
						Aller à la liste de courses
					</Button>
				</div>
				<div className="grid grid-cols-[fit-content(100%)_auto_auto] gap-2 gap-x-2 sm:gap-x-8 w-fit">
					{
						totalIngredients.map(totalIngredient => {
							const ingredientInStock = ingredientsInStock.find(ingredientInStock => ingredientInStock.id === totalIngredient.id);
							let stockValue = "";
							if (ingredientInStock) {
								if (ingredientInStock.amount === null) {
									stockValue = "";
								} else {
									stockValue = String(ingredientInStock.amount);
								}
							}
							const totalIngredientMinusStocks = totalIngredientsMinusStocks.find(totalIngredientMinusStocks => totalIngredientMinusStocks.id === totalIngredient.id)!;

							return (
								<Fragment key={totalIngredient.id}>
									<p
										className="flex items-center"
									>
										<span>
											<b>{`${totalIngredient.amount} ${ingredientUnitDirectObjectLabels[totalIngredient.unit]}`}</b>
											{` de ${totalIngredient.name.toLocaleLowerCase()}`}
										</span>
									</p>
									<p className="space-x-2">
										<span>Déjà en stock :</span>
										<TextField
											className="w-16"
											type="number"
											value={stockValue}
											onChange={event => {
												setIngredientsInStock(prev => {
													const nextIngredientsInStock = structuredClone(prev);

													let nextIngredientInStock = nextIngredientsInStock.find(ingredientInStock => ingredientInStock.id === totalIngredient.id);

													const nextAmount = event.target.value ? Number(event.target.value) : null;

													if (nextIngredientInStock) {
														nextIngredientInStock.amount = nextAmount;
													} else {
														nextIngredientInStock = {
															id:     totalIngredient.id,
															amount: nextAmount,
														};
														nextIngredientsInStock.push(nextIngredientInStock);
													}

													return nextIngredientsInStock;
												});
											}}
											min={0}
										/>
										<span>
											{ingredientUnitDirectObjectLabels[totalIngredientMinusStocks.unit]}.
										</span>
									</p>
									<p
										className="flex items-center"
									>
										<span>Restant à obtenir : <b>{totalIngredientMinusStocks.amount} {ingredientUnitDirectObjectLabels[totalIngredientMinusStocks.unit]}</b></span>
									</p>
								</Fragment>
							);
						})
					}
				</div>
			</div>
		</Page>
	);
};