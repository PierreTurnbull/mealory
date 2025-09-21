import type { TBackup } from "./backup.types";

export const applyBackup = (
	backup: TBackup,
) => {
	if (backup) {
		Object.keys(localStorage)
			.filter(key => !key.includes("backup_"))
			.forEach(key => localStorage.removeItem(key));

		for (const key in backup.content) {
			const backupItem = backup.content[key];

			localStorage.setItem(key, JSON.stringify(backupItem));
		}
	}
};