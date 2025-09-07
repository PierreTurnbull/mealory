
import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { dbModelVersion } from "../db/dbModelVersion";
import { theme } from "../theme";
import { NotificationsProvider } from "./features/notification/context/NotificationsProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { Router } from "./router/Router";

function App() {
	const dbVersion = localStorage.dbVersion === undefined ? undefined : Number(localStorage.dbVersion);

	if (dbVersion === undefined) {
		localStorage.clear();
		localStorage.dbVersion = dbModelVersion;

		console.info(`Cleared database as it is not versioned. Now at version ${dbModelVersion}.`);
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
