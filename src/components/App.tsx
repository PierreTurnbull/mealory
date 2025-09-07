
import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { theme } from "../theme";
import { IngredientsProvider } from "./features/ingredient/ingredientsContext/IngredientsProvider";
import { NotificationsProvider } from "./features/notification/context/NotificationsProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { Router } from "./router/Router";

function App() {
	return (
		<NotificationsProvider>
			<ThemeProvider theme={theme}>
				<IngredientsProvider>
					<div
						className={`
							bg-slate-100
							min-h-screen
						`}
					>
						<Router />
						<Notifications />
					</div>
				</IngredientsProvider>
			</ThemeProvider>
		</NotificationsProvider>
	);
}

export default App;
