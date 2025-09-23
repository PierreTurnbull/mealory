/* eslint-disable @typescript-eslint/no-explicit-any */

export const migration_3_4 = () => {
	const plannings = localStorage.plannings ? JSON.parse(localStorage.plannings) : null;

	if (!plannings) {
		return;
	}

	plannings.forEach((planning: any) => {
		planning.dishes = planning.recipes;
		delete planning.recipes;
	});

	localStorage.plannings = JSON.stringify(plannings);
};