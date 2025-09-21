import type { TBackup } from "./backup.types";

export const generateBackup = () => {
	const backup: TBackup = {
		date:    new Date(),
		content: Object.fromEntries(Object.keys(localStorage)
			.filter(key => !key.includes("backup_"))
			.map(key => {
				const backupItem = JSON.parse(localStorage.getItem(key)!);

				return [key, backupItem];
			})),
	};

	return backup;
};