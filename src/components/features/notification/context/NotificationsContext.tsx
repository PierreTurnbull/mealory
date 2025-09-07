import { createContext } from "react";
import type { TNotificationsContextState } from "./notificationsContextState.type";

export const NotificationsContext = createContext<TNotificationsContextState|null>(null);