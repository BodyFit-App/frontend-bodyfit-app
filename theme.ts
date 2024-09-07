import { DarkTheme } from "@react-navigation/native";
import { MD3DarkTheme as DefaultTheme } from "react-native-paper";

const theme = {
	...DefaultTheme,
	...DarkTheme,
	colors: {
		...DefaultTheme.colors,
		...DarkTheme.colors,
		background: "#0b0b12",
		text: "#ffffff",
	},
};

export default theme;
