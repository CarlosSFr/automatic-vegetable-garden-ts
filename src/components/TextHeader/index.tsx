import { Text } from "react-native";
import { Container, TextContainer } from "./styles";

type Props = {
    title: string;
}

export function TextHeader({title}: Props){
    return(
        <Container>
            <TextContainer>
                {title}
            </TextContainer>
        </Container>
    )
}