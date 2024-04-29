import { Container, ImageContainer, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"

export function Login(){
    return(
        <Container>
            <ImageContainer source={require("./../../assets/bg-img.png")}>
                <Title>
                    Shrek
                </Title>
            </ImageContainer>
        </Container>
    )
}