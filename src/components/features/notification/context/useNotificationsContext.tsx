import { useContext } from "react";
import { NotificationsContext } from "./NotificationsContext";

export const useNotificationsContext = () => {
	const notificationsContext = useContext(NotificationsContext);

	if (!notificationsContext) {
		throw Error("Missing provider for NotificationsContext.");
	}

	return notificationsContext;
};