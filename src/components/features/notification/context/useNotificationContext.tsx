import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export const useNotificationContext = () => {
	const notificationContext = useContext(NotificationContext);

	if (!notificationContext) {
		throw Error("Missing provider for NotificationContext.");
	}

	return notificationContext;
};