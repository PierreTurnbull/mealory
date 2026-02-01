export const migration_5_6 = () => {
	localStorage.updatedAt = new Date().toISOString();
};