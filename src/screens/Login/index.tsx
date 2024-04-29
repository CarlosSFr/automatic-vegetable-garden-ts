import { Container, ImageContainer, Subtitle, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"

export function Login(){
    return(
        <ImageContainer source={require("./../../assets/bg-img.png")}>
            <Container>
                <Title>
                    Sua horta facilmente
                </Title>
                <Subtitle>
                    em qualquer lugar
                </Subtitle>
            </Container>
        </ImageContainer>
    )
}