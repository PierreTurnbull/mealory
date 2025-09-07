import { useNotificationsContext } from "../context/useNotificationsContext";
import { Notification } from "./Notification/Notification";

export const Notifications = () => {
	const notificationsContext = useNotificationsContext();

	return (
		<div
			className="fixed right-0 bottom-0 pointer-events-none space-y-4 p-8"
		>
			{
				notificationsContext.notifications.map(notification => {
					return (
						<Notification
							key={notification.id}
							notification={notification}
						/>
					);
				})
			}
		</div>
	);
};