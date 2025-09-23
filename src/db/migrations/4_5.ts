/* eslint-disable @typescript-eslint/no-explicit-any */

export const migration_4_5 = () => {
	const plannings = localStorage.plannings ? JSON.parse(localStorage.plannings) : null;

	if (!plannings) {
		return;
	}

	plannings.forEach((planning: any) => {
		planning.meals = [];
	});

	localStorage.plannings = JSON.stringify(plannings);
};