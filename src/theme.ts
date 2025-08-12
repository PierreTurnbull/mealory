import { createTheme } from "@mui/material/styles";
import Color from "colorjs.io";
import colors from "tailwindcss/colors";

const hex = (clh: string) => {
	const color = new Color(clh);
	const hex = color.to("srgb").toString({ format: "hex" });

	return hex;
};

const palette = createTheme({
	palette: {
		primary: {
			main:         hex(colors.violet[500]),
			light:        hex(colors.violet[500]),
			dark:         hex(colors.violet[500]),
			contrastText: hex(colors.violet[500]),
		},
	},
});

const components = createTheme({
	components: {
		MuiSelect: {
			styleOverrides: {
				root: {
					"& legend": {
						display: "none",
					},
					"& .MuiOutlinedInput-notchedOutline": {
						height: 32,
						top:    0,
					},
				},
				select: {
					padding:    "0 8px",
					height:     32,
					display:    "flex",
					alignItems: "center",
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					height:  32,
					padding: "0 8px",
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					"&::after": {
						display: "none",
					},
					"&::before": {
						content:      "\"\"",
						border:       `1px solid ${palette.palette.grey[400]}`,
						position:     "absolute",
						top:          0,
						right:        0,
						bottom:       0,
						left:         0,
						borderRadius: 4,
						transition:   "initial",
					},

					"&:hover::before": {
						borderColor:  palette.palette.grey[900],
						borderBottom: `1px solid ${palette.palette.grey[900]} !important`,
					},

					"&.Mui-focused::before": {
						borderWidth: 2,
						borderColor: palette.palette.primary.main,
					},

					"&.Mui-focused:hover::before": {
						borderBottom: `2px solid ${palette.palette.primary.main} !important`,
					},
				},
				input: {
					padding:      "0 8px !important",
					height:       32,
					borderRadius: 4,
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				option: {
					padding: "0 8px",
					height:  32,
				},
			},
		},
	},
});

export const typography = createTheme({
	typography: {
		fontSize: 12,
	},
});

export const theme = createTheme({
	palette:    palette.palette,
	components: components.components,
	typography: typography.typography,
});