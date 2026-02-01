import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";

export const useExportData = () => {
	const notificationsContext = useNotificationsContext();

	const exportData = async () => {
		let data = JSON.stringify(localStorage);
		const parsedData = JSON.parse(data);
	
		parsedData.mode = import.meta.env.MODE;
		data = JSON.stringify(parsedData);
	
		await navigator.clipboard.writeText(data);
	
		notificationsContext.addNotification("Données exportées dans le presse-papier.", "success");
	};

	return exportData;
};