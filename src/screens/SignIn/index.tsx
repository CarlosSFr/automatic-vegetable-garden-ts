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
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type FormSignInProps = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter no mínimo 6 digitos.")
})

export function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormSignInProps>({
        resolver: yupResolver(signInSchema)
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const navigation = useNavigation<AuthNavigationRoutesProps>();

    async function handleSignIn() {
        setLoading(true)
        try {
           await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            alert("Login falhou: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    function handleNewAccount() {
        navigation.navigate("signUp");
    }

    return (
        <ImageContainer
            source={imgBg}
            defaultSource={imgBg}
        >
            <StatusBar
                translucent
                style="light"
            />
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
                                autoCapitalize="none"
                                value={value}
                                onChangeText={(value) => { onChange(value); setEmail(value); }}
                            />
                        )}
                    />
                    {errors.email && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold" }}>
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
                                onChangeText={(value) => { onChange(value); setPassword(value); }}
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                autoCapitalize="none"
                            />
                        )}
                    />
                    {errors.password && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold" }}>
                            {errors.password.message}
                        </Text>
                    )}

                    <ForgotPass>
                        Esqueceu sua senha?
                    </ForgotPass>
                    <Button
                        title="Login"
                        onPress={handleSubmit(handleSignIn)}
                        loading={loading}
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