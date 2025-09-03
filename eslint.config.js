import js from "@eslint/js"
import stylisticTs from "@stylistic/eslint-plugin-ts"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
			"@stylistic/ts": stylisticTs, 
		},
		ignores: ["dist/**/*", "node_modules/**/*", ".vite/**/*", "src/generated/**/*"],
		rules:   {
			"indent":                            ["error", "tab"],
			"semi":                              ["error", "always"],
			"quotes":                            ["error", "double"],
			"comma-dangle":                      ["error", "always-multiline"],
			"prefer-const":                      "error",
			"object-curly-spacing":              ["error", "always"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args":                      "all",
					"argsIgnorePattern":         "^_",
					"varsIgnorePattern":         "^_",
					"caughtErrorsIgnorePattern": "^_",
				},
			],
			"@stylistic/ts/key-spacing": [
				"error", {
					"beforeColon": false,
					"afterColon":  true,
					"align":       "value",
				},
			],
		},
  },
])
