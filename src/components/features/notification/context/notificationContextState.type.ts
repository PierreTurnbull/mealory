export type TNotificationType = "success"

export type TNotification = {
	id:   string
	type: TNotificationType
	text: string
}

export type TNotificationContextState = {
	notifications:      TNotification[]
	addNotification:    (text: TNotification["text"], type: TNotification["type"]) => void
	removeNotification: (notificationId: TNotification["id"]) => void
}