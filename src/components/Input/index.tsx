import { TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";
import theme from "../../theme";

type Props = TextInputProps & {
    placeholder: string;
    placeholderColor?: string;
}

export function Input({ placeholder, placeholderColor = theme.colors.gray_300, ...rest }: Props) {
    const { colors } = useTheme()

    return (
        <Container
            {...rest}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
        />
    )
}