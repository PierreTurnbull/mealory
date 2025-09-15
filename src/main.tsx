import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./components/App.tsx";
import "./reset.css";
// after reset
import { v4 } from "uuid";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).id = v4;

createRoot(document.getElementById("root")!).render(
	<BrowserRouter basename="/mealory">
		<App />
	</BrowserRouter>,
);
