
import "dayjs/locale/fr"; // importe la locale
import { NotificationProvider } from "./features/notification/context/NotificationProvider";
import { Notifications } from "./features/notification/Notifications/Notifications";
import { Router } from "./router/Router";

function App() {
	return (
		<NotificationProvider>
			<div
				className={`
						bg-gray-100
						min-h-screen
					`}
			>
				<Router />
				<Notifications />
			</div>
		</NotificationProvider>
	);
}

export default App;
