import { Container } from "./styles";
import { useTheme } from "styled-components/native";

type Props = {
    placeholder: string;
}

export function Input({placeholder}: Props){
    const { colors } = useTheme()

    return (
        <Container
            placeholder={placeholder}
            placeholderTextColor={colors.gray_300}
        />
    )
}