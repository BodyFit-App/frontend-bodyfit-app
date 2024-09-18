import { Button, ButtonProps } from "react-native-paper";
import theme from "../../theme";

export default function CustomButton({
  children,
  style = {},
  ...props
}: ButtonProps) {
  return (
    <Button
      mode="contained"
      textColor= {theme.colors.text}
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

