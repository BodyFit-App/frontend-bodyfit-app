import { Button, ButtonProps } from "react-native-paper";
import theme from "../../theme";

/**
 * `CustomButton` component that customizes the button with specific styles while
 * allowing default `react-native-paper` button properties to be passed through.
 *
 * @param {ButtonProps} props - The props for the `react-native-paper` `Button` component.
 * @param {React.ReactNode} props.children - The content of the button (text or any JSX element).
 * @param {Object} [props.style={}] - Optional custom style to be applied to the button.
 * @returns {JSX.Element} The customized button with applied styles.
 */

export default function CustomButton({
  children,
  style = {},
  ...props
}: ButtonProps) {
  return (
    <Button
      mode="contained"
      textColor={theme.colors.text}
      labelStyle={{ fontSize: 16 }}
      style={{
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: theme.colors.backgroundButton,
        ...(style as object),
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
