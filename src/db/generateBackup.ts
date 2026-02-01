import type { TBackup } from "./backup.types";
import { db } from "./db.model";

export const generateBackup = () => {
	const backup: TBackup = {
		date:    new Date(),
		content: Object.fromEntries(Object.keys(db.getAll())
			.filter(key => key !== "githubToken")
			.filter(key => db.getItem(key) !== "")
			.map(key => {
				const value = db.getItem(key);
				const backupItem = JSON.parse(value!);

				return [key, backupItem];
			})),
	};

	return backup;
};