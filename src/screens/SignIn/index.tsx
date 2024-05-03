import { ImageContainer, Subtitle } from "../Login/styles";
import { ButtonContainer, Container, SideLines, SmallText, StyleContainer } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignIn() {
    return (
        <ImageContainer source={imgBg}>
            <Container>
                <Subtitle style={{ fontWeight: 'bold' }}>
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
                <ButtonContainer>
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
                <Button
                        title="Faça login com Google"
                />
            </Container>
        </ImageContainer>
    )
}