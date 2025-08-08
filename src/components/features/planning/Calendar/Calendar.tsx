import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../common/Button/Button";
import { ConfirmationModal } from "../../../common/ConfirmationModal/ConfirmationModal";
import { DatePicker } from "../../../common/DatePicker/DatePicker";
import { Section } from "../../../common/Section/Section";
import { useNotificationContext } from "../../notification/context/useNotificationContext";
import { CreateRecipeModal } from "../../recipe/CreateRecipeModal/CreateRecipeModal";
import type { TPlanning, TPlanningDay } from "../planning.types";
import { getDefaultPlanning } from "../utils/getDefaultPlanning/getDefaultPlanning";
import { getPlanning } from "../utils/getPlanning/getPlanning";
import { CalendarMeal } from "./CalendarMeal/CalendarMeal";

export const Calendar = () => {
	const navigate = useNavigate();

	const notificationContext = useNotificationContext();

	const [confirmResetModalIsOpen, setConfirmRestModalIsOpen] = useState(false);
	const [mealForWhichRecipeIsBeingCreated, setMealForWhichRecipeIsBeingCreated] = useState<{ key: number, meal: keyof TPlanningDay} | null >(null);

	const persistedPlanning: TPlanning = localStorage.planning
		? JSON.parse(localStorage.planning)
		: getDefaultPlanning();
	persistedPlanning.startDate = new Date(persistedPlanning.startDate);
	persistedPlanning.endDate = new Date(persistedPlanning.endDate);

	const [planning, setPlanning] = useState<TPlanning>(persistedPlanning);

	const selectRecipe = (
		dayIndex: number,
		mealKey: keyof TPlanningDay,
		recipeId: number | null,
	) => {
		setPlanning(prev => {
			const nextPlanning = structuredClone(prev);

			nextPlanning.planningDays[dayIndex][mealKey].recipeId = recipeId;

			return nextPlanning;
		});
	};

	const setDate = (
		dateType: "start" | "end",
		date: Date,
	) => {
		setPlanning(prevPlanning => {
			const startDate = dateType === "start" ? date : planning.startDate;
			const endDate = dateType === "end" ? date : planning.endDate;

			const nextPlanning = getPlanning(startDate, endDate);

			// Keep the chosen recipes of planning days that are still present in the new planning interval.
			for (let i = 0; i < nextPlanning.planningDays.length; i++) {
				const date = new Date(nextPlanning.startDate);
				date.setDate(date.getDate() + i);

				const nextPlanningDay = nextPlanning.planningDays[i];

				const prevPlanningDay = prevPlanning.planningDays.find((_, key) => {
					const prevDate = new Date(prevPlanning.startDate);
					prevDate.setDate(prevDate.getDate() + key);

					return date.toLocaleDateString() === prevDate.toLocaleDateString();
				});

				if (prevPlanningDay) {
					nextPlanningDay.lunch = prevPlanningDay.lunch;
					nextPlanningDay.dinner = prevPlanningDay.dinner;
				}
			}

			return nextPlanning;
		});
	};

	return (
		<div
			className="space-y-4"
		>
			<div className="flex flex-col gap-4 items-start sm:flex-row">
				<span className="flex gap-4 items-center">
					<p>Date de début :</p>
					<DatePicker
						date={planning.startDate}
						setDate={date => setDate("start", date)}
					/>
				</span>
				<span className="flex gap-4 items-center">
					<p>Date de fin :</p>
					<DatePicker
						date={planning.endDate}
						setDate={date => setDate("end", date)}
					/>
				</span>
			</div>
			<Section>
				<div className="space-y-4 flex flex-col items-center">
					<div className="flex gap-2">
						<Button
							onClick={() => {
								localStorage.planning = JSON.stringify(planning);
								notificationContext.addNotification("Le planning a été sauvegardé.", "success");
							}}
						>
							Sauvegarder
						</Button>
						<Button
							type="danger"
							onClick={() => setConfirmRestModalIsOpen(true)}
						>
							Réinitialiser
						</Button>
						<Button
							type="secondary"
							onClick={() => navigate("/stocks")}
						>
							Préparer la liste de courses
						</Button>
					</div>
					<div
						className="flex gap-4 flex-wrap justify-center"
					>
						{
							planning.planningDays.map((planningDay, key) => {
								const date = new Date(planning.startDate);
								date.setDate(date.getDate() + key);

								const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();

								return (
									<div
										key={key}
										className={`
											bg-gray-50
											rounded
											p-4
											w-9/10
											sm:w-auto
											space-y-2
											${isToday ? "border-4 border-violet-500" : ""}
										`}
									>
										<p
											className={`
												text-xs
												rounded
												p-1
												w-fit
												${isToday ? "" : "text-gray-400"}
												${isToday ? "bg-violet-200" : "bg-gray-100"}
											`}
										>
											{date.toLocaleDateString()}
										</p>
										<div>
											{
												<div
													className="rounded space-y-2"
												>
													<p>Déjeuner :</p>
													<CalendarMeal
														mealType="lunch"
														planningDay={planningDay}
														selectRecipe={(mealKey, recipeId) => selectRecipe(key, mealKey, recipeId)}
														onCreateRecipeClick={() => setMealForWhichRecipeIsBeingCreated({ key: key, meal: "lunch" })}
													/>
													<p>Diner :</p>
													<CalendarMeal
														mealType="dinner"
														planningDay={planningDay}
														selectRecipe={(mealKey, recipeId) => selectRecipe(key, mealKey, recipeId)}
														onCreateRecipeClick={() => setMealForWhichRecipeIsBeingCreated({ key: key, meal: "dinner" })}
													/>
												</div>
											}
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</Section>
			{
				confirmResetModalIsOpen
					? (
						<ConfirmationModal
							cancel={() => setConfirmRestModalIsOpen(false)}
							description="Es-tu sûr de vouloir réinitialiser le planning ? Cela signifie que plus aucune recette ne sera sélectionnée."
							title="Réinitialiser le planning"
							submit={() => {
								const defaultPlanning = getDefaultPlanning();

								setPlanning(defaultPlanning);
								localStorage.planning = JSON.stringify(defaultPlanning);
								setConfirmRestModalIsOpen(false);
								notificationContext.addNotification("Le planning a été réinitialisé", "success");
							}}
							buttonType="danger"
						/>
					)
					: null
			}
			{
				mealForWhichRecipeIsBeingCreated
					? (
						<CreateRecipeModal
							close={() => setMealForWhichRecipeIsBeingCreated(null)}
							onSubmit={recipeId => {
								selectRecipe(mealForWhichRecipeIsBeingCreated.key, mealForWhichRecipeIsBeingCreated.meal, recipeId);
							}}
						/>
					)
					: null
			}
		</div>
	);
};