import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType:  "autoUpdate",
			includeAssets: ["assets/*"],
			manifest:      {
				name:             "Mealory",
				short_name:       "Mealory",
				start_url:        "/mealory",
				display:          "standalone",
				background_color: "#ffffff",
				theme_color:      "#ffffff",
				icons:            [
					{
						src:   "icon-192.png",
						sizes: "192x192",
						type:  "image/png",
					},
					{
						src:   "icon-512.png",
						sizes: "512x512",
						type:  "image/png",
					},
				],
			},
			workbox: {
				// defining cached files formats
				globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
			},
		}),
	],
	base: "/mealory",
});
