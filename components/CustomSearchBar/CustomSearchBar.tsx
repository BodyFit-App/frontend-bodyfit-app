import { Searchbar, SearchbarProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import theme from "../../theme";

export default function CustomSearchBar({
    children,
    style = {},
    ...props
  }: SearchbarProps) {

  return (
    <Searchbar
      style={{
        width: "100%",
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: theme.colors.backgroundButton,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        ...(style as object),
      }}
      inputStyle={{
        fontSize: 16, 
        alignSelf: "center",
      }}
      {...props}
    />
  );
}