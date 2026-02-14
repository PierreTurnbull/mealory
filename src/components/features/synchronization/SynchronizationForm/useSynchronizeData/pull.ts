import { db } from "../../../../../db/db.model";
import type { TNotificationsContextState } from "../../../notification/context/notificationsContextState.type";

export const pull = async (
	githubToken: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	upstreamData: any,
	notificationsContext: TNotificationsContextState,
) => {
	if ((upstreamData.mode !== import.meta.env.MODE)) {
		notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en mode ${upstreamData.mode}, mais l'app est en mode ${import.meta.env.MODE}.`, "error");
		return;
	}

	if (!("dbVersion" in upstreamData)) {
		notificationsContext.addNotification("Impossible d'importer les données : version de db manquante.", "error");
		return;
	}

	if (upstreamData.dbVersion !== db.getItem("dbVersion")) {
		notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en version ${upstreamData.dbVersion}, mais la db est en version ${db.getItem("dbVersion")}.`, "error");
		return;
	}

	upstreamData.githubToken = githubToken;

	db.clear();

	for (const key in upstreamData) {
		if (key in upstreamData) {
			db.setItem(key, upstreamData[key] as string, { mustBypassUpdatedAt: true });
		}
	}

	notificationsContext.addNotification("Les données en amont sont plus récentes, elles ont remplacé les données locales.", "success");
};