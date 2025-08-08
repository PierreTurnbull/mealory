import { useEffect, useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import { NotificationContext } from "./NotificationContext";
import type { TNotification, TNotificationContextState } from "./notificationContextState.type";

type TNotificationProviderProps = {
	children: ReactNode,
}

export const NotificationProvider = ({
	children,
}: TNotificationProviderProps) => {
	const [notifications, setNotifications] = useState<TNotification[]>([]);

	const addNotification = (
		text: TNotification["text"],
		type: TNotification["type"],
	) => {
		setNotifications(prev => {
			const nextNotifications = structuredClone(prev);

			const nextNotification: TNotification = {
				id:   uuid(),
				text: text,
				type: type,
			};

			nextNotifications.push(nextNotification);

			return nextNotifications;
		});
	};

	const removeNotification = (notificationId: TNotification["id"]) => {
		setNotifications(prev => {
			const nextNotifications = structuredClone(prev);

			const index = nextNotifications.findIndex(nextNotification => nextNotification.id === notificationId);

			if (index !== -1) {
				nextNotifications.splice(index, 1);
			}

			return nextNotifications;
		});
	};

	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.code === "Escape") {
				setNotifications([]);
			}
		};

		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, []);

	const contextValue: TNotificationContextState = {
		notifications:      notifications,
		addNotification:    addNotification,
		removeNotification: removeNotification,
	};

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
		</NotificationContext.Provider>
	);
};