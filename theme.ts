import { DarkTheme } from "@react-navigation/native";
import { MD3DarkTheme as DefaultTheme } from "react-native-paper";

const theme = {
	...DefaultTheme,
	...DarkTheme,
	colors: {
		...DefaultTheme.colors,
		...DarkTheme.colors,
		background: "#0b0b12",
		border: "#42424D",
		primary: "#2F80ED",
		backgroundButton: "#161626",
		text: "#2F80ED",
		textFollow: "#ffffff",
		textPlaceholder: "#79797F",
		textFilter: "#ffffff",
		backgroundNav: "#161626",
	},
};

export default theme;
