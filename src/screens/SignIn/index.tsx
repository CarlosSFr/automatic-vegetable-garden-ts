import { Container, ForgotPass, ImageContainer, Register, Subtitle, Title } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "../../routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

type FormSignInProps = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter no mínimo 6 digitos.")
})

export function SignIn() {
    const {control, handleSubmit, formState: {errors}} = useForm<FormSignInProps>({
        resolver: yupResolver(signInSchema)
    })
    const navigation = useNavigation<AuthNavigationRoutesProps>();

    function handleSignIn(data: any) {
        console.log(data)
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
                        <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        />
                    {errors.email && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold"}}>
                            {errors.email.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                            />
                        )}
                        />
                    {errors.password && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold"}}>
                            {errors.password.message}
                        </Text>
                    )}

                    <ForgotPass>
                        Esqueceu sua senha?
                    </ForgotPass>
                    <Button
                        title="Login"
                        onPress={handleSubmit(handleSignIn)}
                    />
                    <Register>
                        Não possui uma conta?
                        <Text
                            style={{ fontWeight: 'bold' }}
                            onPress={handleNewAccount}
                        >
                            {" "}Cadastre-se
                        </Text>
                    </Register>
                </Container>
            </ScrollView>
        </ImageContainer>
    )
}