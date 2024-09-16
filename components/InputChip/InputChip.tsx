import { Chip, ChipProps } from "react-native-paper";
import theme from "../../theme";

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