import { Searchbar, SearchbarProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import theme from "../../theme";

/**
 * `CustomSearchBar` component that wraps the `Searchbar` from `react-native-paper`,
 * applying custom styles while allowing default props to be passed through.
 *
 * @param {SearchbarProps} props - The props for the `Searchbar` component from `react-native-paper`.
 * @param {React.ReactNode} [children] - Optional content passed as children (not used here).
 * @param {Object} [style={}] - Optional custom style to be applied to the search bar.
 * @returns {JSX.Element} The customized search bar component.
 */

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
