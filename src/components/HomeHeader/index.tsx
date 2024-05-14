import { Text } from "react-native";
import { Container, HelloText, TextContainer, UserName } from "./styles";


export function HomeHeader() {
    return (
        <Container>
            <TextContainer>
                <HelloText>
                    Olá,
                </HelloText>
                <UserName>
                    Carlos Freitas
                </UserName>
            </TextContainer>
        </Container>
    )
}