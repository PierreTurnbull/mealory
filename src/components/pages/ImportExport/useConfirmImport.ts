import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";

export const useConfirmImport = (
	dataToImport: unknown,
) => {
	const notificationsContext = useNotificationsContext();

	const confirmImport = () => {
		if (typeof dataToImport !== "object" || dataToImport === null) {
			return;
		}

		localStorage.clear();

		if ("dbVersion" in dataToImport) {
			localStorage.setItem("dbVersion", dataToImport["dbVersion"] as string);
		}
		if ("defaultPortions" in dataToImport) {
			localStorage.setItem("defaultPortions", dataToImport["defaultPortions"] as string);
		}
		if ("ingredients" in dataToImport) {
			localStorage.setItem("ingredients", dataToImport["ingredients"] as string);
		}
		if ("plannings" in dataToImport) {
			localStorage.setItem("plannings", dataToImport["plannings"] as string);
		}
		if ("recipes" in dataToImport) {
			localStorage.setItem("recipes", dataToImport["recipes"] as string);
		}

		notificationsContext.addNotification("Les données ont été importées.", "success");
	};

	return confirmImport;
};