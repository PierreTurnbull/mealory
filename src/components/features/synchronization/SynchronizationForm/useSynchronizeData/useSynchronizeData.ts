import { db } from "../../../../../db/db.model";
import { useNotificationsContext } from "../../../notification/context/useNotificationsContext";
import { getToken } from "./getToken";
import { getUpstreamData } from "./getUpstreamData";
import { pull } from "./pull";
import { push } from "./push";

export const GIST_ID = "c841b87d10204fe283be69c8497bd727";
export const FILE_NAME = `mealory.${import.meta.env.MODE}.json`;

export const useSynchronizeData = (
	setIsSynchronizing: (isSynchronizing: boolean) => void,
	githubToken: string,
) => {
	const notificationsContext = useNotificationsContext();

	const synchronizeData = async () => {
		try {
			setIsSynchronizing(true);

			const token = await getToken(githubToken);

			const upstreamData = await getUpstreamData(token);

			const mustPush = (
				!upstreamData.updatedAt ||
				(new Date(upstreamData.updatedAt) < new Date(db.getItem("updatedAt")!))
			);
			const mustPull = (
				upstreamData.updatedAt &&
				new Date(upstreamData.updatedAt) > new Date(db.getItem("updatedAt")!)
			);

			if (mustPush) {
				await push(token, notificationsContext);
			} else if (mustPull) {
				await pull(githubToken, upstreamData, notificationsContext);
			} else {
				notificationsContext.addNotification("Les données en amont ont la même ancienneté que les données locales. Aucune action n'est faite.", "info");
			}
		} catch (error) {
			console.error(error);
			notificationsContext.addNotification("Une erreur est survenue lors de la synchronisation des données.", "error");
		}

		setIsSynchronizing(false);
	};

	return synchronizeData;
};