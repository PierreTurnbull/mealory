import { useNotificationContext } from "../context/useNotificationContext";
import { Notification } from "./Notification/Notification";

export const Notifications = () => {
	const notificationContext = useNotificationContext();

	return (
		<div
			className="fixed right-0 bottom-0 pointer-events-none space-y-4 p-8"
		>
			{
				notificationContext.notifications.map(notification => {
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