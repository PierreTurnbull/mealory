import type { TBackup } from "./backup.types";
import { db } from "./db.model";

export const applyBackup = (
	backup: TBackup,
) => {
	if (backup) {
		Object.keys(db.getAll())
			.forEach(key => db.removeItem(key));

		for (const key in backup.content) {
			const backupItem = backup.content[key];

			db.setItem(key, JSON.stringify(backupItem));
		}
	}
};