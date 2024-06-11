import { TextInputProps } from "react-native";
import { Container } from "./styles";
import theme from "../../theme";

type Props = TextInputProps & {
    placeholder: string;
    placeholderColor?: string;
}

export function Input({ placeholder, placeholderColor = theme.colors.gray_300, ...rest }: Props) {

    return (
        <Container
            {...rest}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
        />
    )
}