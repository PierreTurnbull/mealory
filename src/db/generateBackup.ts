import type { TBackup } from "./backup.types";

export const generateBackup = () => {
	const backup: TBackup = {
		date:    new Date(),
		content: Object.fromEntries(Object.keys(localStorage)
			.filter(key => !key.includes("backup_"))
			.filter(key => localStorage.getItem(key) !== "")
			.map(key => {
				const value = localStorage.getItem(key);
				const backupItem = JSON.parse(value!);

				return [key, backupItem];
			})),
	};

	return backup;
};