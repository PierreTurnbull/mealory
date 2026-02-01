import { applyBackup } from "./applyBackup";
import { db } from "./db.model";
import { generateBackup } from "./generateBackup";
import { migrations } from "./migrations";

export const applyMigrations = () => {
	const dbVersion = db.getItem("dbVersion") === undefined ? 0 : Number(db.getItem("dbVersion"));

	const migrationsToApply = migrations.slice(dbVersion);

	if (migrationsToApply.length === 0) {
		return;
	}

	const backup = generateBackup();

	for (const key in migrationsToApply) {
		const actualKey = dbVersion + Number(key);

		const migrationToApply = migrationsToApply[key];

		const groupKey = `Migration v${actualKey} -> v${actualKey + 1}`;

		console.group(groupKey);

		try {
			console.info("Applying db migration.");
			migrationToApply();
			console.info("Successfully applied db migration.");
			db.setItem("dbVersion", String(actualKey + 1));
			console.info(`Database is now at version ${actualKey + 1}`);

			console.groupEnd();
		} catch (error) {
			console.error("An error occurred while applying the migration:", error);
			console.info("Rolling back migration.");
			applyBackup(backup);
			console.info("Migration rolled back successfully.");

			console.groupEnd();

			return error as Error;
		}
	}
};