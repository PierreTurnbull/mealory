import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./components/App.tsx";
import "./reset.css";
// after reset
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter basename="/mealory">
		<App />
	</BrowserRouter>,
);
