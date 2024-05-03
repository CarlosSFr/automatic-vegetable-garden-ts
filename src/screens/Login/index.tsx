import { Container, ForgotPass, ImageContainer, Register, Subtitle, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Text } from "react-native";

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
                <ForgotPass>
                    Esqueceu sua senha?
                </ForgotPass>
                <Button />
                <Register>
                    Não possui uma conta? <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
                </Register>
            </Container>
        </ImageContainer>
    )
}