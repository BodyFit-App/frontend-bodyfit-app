import { Chip, ChipProps } from "react-native-paper";
import theme from "../../theme";

/**
 * InputChip component is a styled version of the Chip component from `react-native-paper`,
 * with custom styling applied for alignment, background, and border. It allows for additional
 * customization via props.
 *
 * @param {ChipProps} props - The props for the Chip component from `react-native-paper`.
 * @param {React.ReactNode} props.children - The content inside the Chip, typically text or icons.
 * @param {Object} [props.style={}] - Optional custom style to be applied to the Chip.
 * @returns {JSX.Element} A styled Chip component.
 */

export default function InputChip({
  children,
  style = {},
  ...props
}: ChipProps) {
  return (
    <Chip
      style={{
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: theme.colors.backgroundButton,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        ...(style as object),
      }}
      textStyle={{
        fontSize: 16,
        alignSelf: "center",
      }}
      {...props}
    >
      {children}
    </Chip>
  );
}
