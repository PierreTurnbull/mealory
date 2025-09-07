import { useEffect } from "react";
import { IconButton } from "../../../../common/IconButton/IconButton";
import { Paper } from "../../../../common/Paper/Paper";
import type { TNotification } from "../../context/notificationsContextState.type";
import { useNotificationsContext } from "../../context/useNotificationsContext";


type TNotificationProps = {
	notification: TNotification
}

export const Notification = ({
	notification,
}: TNotificationProps) => {
	const notificationsContext = useNotificationsContext();

	useEffect(() => {
		const id = setTimeout(() => {
			notificationsContext.removeNotification(notification.id);
		}, 10000);

		return () => {
			clearTimeout(id);
		};
	}, [notification, notificationsContext]);

	return (
		<div className="pointer-events-auto max-w-64">
			<Paper>
				<div
					className={`
						${notification.type === "success" ? "border-t-green-400" : ""}
						${notification.type === "error" ? "border-t-red-400" : ""}
						flex
						justify-between
						items-center
						gap-4
						p-4
						border-t-6
					`}
				>
					<p>{notification.text}</p>
					<div
						className="shrink-0">
						<IconButton
							icon="🗙"
							onClick={() => notificationsContext.removeNotification(notification.id)}
							type="secondary"
						/>
					</div>
				</div>
			</Paper>
		</div>
	);
};