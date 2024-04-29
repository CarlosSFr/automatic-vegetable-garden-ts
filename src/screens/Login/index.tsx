import { Container, ImageContainer, Subtitle, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login(){
    return(
        <ImageContainer source={imgBg}>
            <Container>
                <Title>
                    Sua horta facilmente
                </Title>
                <Subtitle>
                    em qualquer lugar
                </Subtitle>
                <Input
                    placeholder="E-mail"
                />
                <Input
                    placeholder="Senha"
                />
                <Button />
            </Container>
        </ImageContainer>
    )
}