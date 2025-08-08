import { createContext } from "react";
import type { TNotificationContextState } from "./notificationContextState.type";

export const NotificationContext = createContext<TNotificationContextState|null>(null);