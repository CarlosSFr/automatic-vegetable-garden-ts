import { ImageContainer, Subtitle } from "../SignIn/styles";
import { ButtonContainer, Container, GoogleButton, GoogleButtonText, SideLines, SmallText, StyleContainer } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { GoogleLogo } from "phosphor-react-native";
import { Text } from "react-native";

export function SignUp() {
    return (
        <ImageContainer source={imgBg}>
            <Container>
                <Subtitle style={{ fontWeight: 'bold', paddingBottom: 40 }}>
                    Faça seu cadastro
                </Subtitle>
                <Input
                    placeholder="Seu nome"
                />
                <Input
                    placeholder="Telefone"
                />
                <Input
                    placeholder="E-mail"
                />
                <Input
                    placeholder="Senha"
                />
                <Input
                    placeholder="Confirme sua senha"
                />
                <ButtonContainer style={{ marginTop: 42 }}>
                    <Button
                        title="Cadastrar"
                    />
                </ButtonContainer>
                <StyleContainer>
                    <SideLines />
                    <SmallText>
                        Ou
                    </SmallText>
                    <SideLines />
                </StyleContainer>
                <GoogleButton>
                    <GoogleLogo size={32} color="white" />
                    <GoogleButtonText>Faça login com Google</GoogleButtonText>
                </GoogleButton>
            </Container>
        </ImageContainer>
    )
}