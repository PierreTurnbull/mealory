import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";

export const useImportData = (
	setDataToImport: (dataToImport: unknown) => void,
) => {
	const notificationsContext = useNotificationsContext();

	const importData = async () => {
		const clipboardItems = await navigator.clipboard.read();

		let blob: Blob;

		try {
			blob = await clipboardItems[0].getType("text/plain");
		} catch (error) {
			console.error(error);
			notificationsContext.addNotification("Impossible de récupérer les données depuis le presse-papiers.", "error");
			return;
		}

		const clipboardText = await blob.text();

		let dataToImport: unknown = null;

		try {
			dataToImport = JSON.parse(clipboardText);
		} catch (error) {
			console.error(error);
			notificationsContext.addNotification("Impossible d'importer les données : format invalide.", "error");
			return;
		}

		if (typeof dataToImport !== "object" || dataToImport === null || !("mode" in dataToImport)) {
			notificationsContext.addNotification("Impossible d'importer les données : format invalide.", "error");
			return;
		}

		if ((dataToImport.mode !== import.meta.env.MODE)) {
			notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en mode ${dataToImport.mode}, mais l'app est en mode ${import.meta.env.MODE}.`, "error");
			return;
		}

		if (!("dbVersion" in dataToImport)) {
			notificationsContext.addNotification("Impossible d'importer les données : version de db manquante.", "error");
			return;
		}

		if (dataToImport.dbVersion !== localStorage.dbVersion) {
			notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en version ${dataToImport.dbVersion}, mais la db est en version ${localStorage.dbVersion}.`, "error");
			return;
		}

		setDataToImport(dataToImport);
	};

	return importData;
};