import { Container, ForgotPass, ImageContainer, Register, Subtitle, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "../../routes/auth.routes";

export function SignIn() {

    const navigation = useNavigation<AuthNavigationRoutesProps>();

    function handleSignIn() {
        //navigation.navigate("")
    }

    function handleNewAccount() {
        navigation.navigate("signUp");
    }

    return (
        <ImageContainer
            source={imgBg}
            defaultSource={imgBg}
        >
            <ScrollView>
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
                    <Button
                        title="Login"
                        onPress={handleSignIn}
                    />
                    <Register>
                        Não possui uma conta?
                        <Text
                            style={{ fontWeight: 'bold' }}
                            onPress={handleNewAccount}
                        >
                            Cadastre-se
                        </Text>
                    </Register>
                </Container>
            </ScrollView>
        </ImageContainer>
    )
}