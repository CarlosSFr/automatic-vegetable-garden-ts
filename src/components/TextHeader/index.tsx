import { Container, TextContainer } from "./styles";
import { StatusBar } from "expo-status-bar";

type Props = {
    title: string;
}

export function TextHeader({ title }: Props) {
    return (
        <Container>
            <StatusBar
                translucent
                style="light"
            />
            <TextContainer>
                {title}
            </TextContainer>
        </Container>
    )
}