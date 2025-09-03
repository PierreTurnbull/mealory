
import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { theme } from "../theme";
import { NotificationProvider } from "./features/notification/context/NotificationProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { Router } from "./router/Router";

function App() {
	return (
		<NotificationProvider>
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
		</NotificationProvider>
	);
}

export default App;
