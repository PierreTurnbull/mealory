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
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					margin: 0,
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: hex(colors.violet[950]),
					fontSize:        12,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					backgroundColor: hex(colors.violet[500]),
					color:           hex(colors.violet[50]),
					borderRadius:    4,
					padding:         0,
					height:          32,
					width:           32,

					"&:hover": {
						backgroundColor: hex(colors.violet[400]),
					},

					"&.Mui-disabled": {
						backgroundColor: hex(colors.slate[200]),
						color:           hex(colors.slate[500]),
					},
				},
				sizeLarge: {
					height: 48,
					width:  48,
				},
				colorSecondary: {
					backgroundColor: hex(colors.violet[200]),
					color:           hex(colors.violet[950]),

					"&:hover": {
						backgroundColor: hex(colors.violet[100]),
					},
				},
				colorError: {
					backgroundColor: hex(colors.red[500]),
					color:           hex(colors.red[50]),

					"&:hover": {
						backgroundColor: hex(colors.red[400]),
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: hex(colors.violet[500]),
					color:           hex(colors.violet[50]),
					borderRadius:    4,
					minHeight:       32,
					padding:         "0 16px",
					textTransform:   "none",
					fontSize:        14,

					"&:hover": {
						backgroundColor: hex(colors.violet[400]),
					},

					"&.Mui-disabled": {
						backgroundColor: hex(colors.slate[200]),
						color:           hex(colors.slate[500]),
					},
				},
				textSecondary: {
					backgroundColor: hex(colors.violet[200]),
					color:           hex(colors.violet[950]),

					"&:hover": {
						backgroundColor: hex(colors.violet[100]),
					},
				},
				textError: {
					backgroundColor: hex(colors.red[500]),
					color:           hex(colors.red[50]),

					"&:hover": {
						backgroundColor: hex(colors.red[400]),
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					"& input": {
						backgroundColor: hex(colors.violet[50]),
					},
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

					"&.Mui-disabled": {
						"&::before": {
							borderBottomStyle: "solid",
						},
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
					padding:   "0 8px",
					height:    32,
					minHeight: "auto !important",
				},
				root: {
					"& .MuiInput-root": {
						width: "100%",
					},
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