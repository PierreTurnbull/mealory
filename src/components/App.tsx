 

import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { useEffect, useState } from "react";
import { applyMigrations } from "../db/applyMigrations";
import { theme } from "../theme";
import { NotificationsProvider } from "./features/notification/context/NotificationsProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { Router } from "./router/Router";

function App() {
	useEffect(() => {
		if (import.meta.env.MODE === "production") {
			console.info("Running in production mode.");
		}
	}, []);

	const [migrationError, setMigrationError] = useState<string | null>(null);
	const [migrationDone, setMigrationDone] = useState(false);

	useEffect(() => {
		const error = applyMigrations();

		if (error) {
			setMigrationError(error.message);
		}

		setMigrationDone(true);
	}, []);

	if (migrationError) {
		return (
			<p>
				Erreur lors de la mise à jour des données. L'application ne peut pas être utilisée en l'état.
			</p>
		);
	}

	if (!migrationDone) {
		return null;
	}

	return (
		<NotificationsProvider>
			<ThemeProvider theme={theme}>
				<div
					className={`
							bg-slate-100
							min-h-screen
						`}
				>
					<Router />
					<Notifications />
				</div>
			</ThemeProvider>
		</NotificationsProvider>
	);
}

export default App;
