import { ImageContainer, Subtitle } from "../SignIn/styles";
import { ButtonContainer, Container, GoogleButton, GoogleButtonText, SideLines, SmallText, StyleContainer } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { GoogleLogo } from "phosphor-react-native"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, Text } from "react-native";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter no mínimo 6 digitos."),
    confirmPassword: yup.string().required("Confirme a senha.").oneOf([yup.ref("password")], "A senha não confere.")
});

export function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    function handleSignUp(data: any) {

    }

    return (
        <ImageContainer
            source={imgBg}
            defaultSource={imgBg}
        >
            <ScrollView>
            <Container>
                <Subtitle style={{ fontWeight: 'bold', paddingBottom: 20 }}>
                    Faça seu cadastro
                </Subtitle>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Seu nome"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                    {errors.name && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold"}}>
                            {errors.name.message}
                        </Text>
                    )}

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="E-mail"
                            onChangeText={onChange}
                            value={value}

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
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />

                    {errors.password && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold"}}>
                            {errors.password.message}
                        </Text>
                    )}

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Confirme sua senha"
                            onChangeText={onChange}
                            value={value}
                            onSubmitEditing={handleSubmit(handleSignUp)}
                            returnKeyType="send"
                            secureTextEntry
                        />
                    )}
                />
                {errors.confirmPassword && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold"}}>
                            {errors.confirmPassword.message}
                        </Text>
                    )}

                <ButtonContainer style={{ marginTop: 42 }}>
                    <Button
                        title="Cadastrar"
                        onPress={handleSubmit(handleSignUp)}
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
            </ScrollView>
        </ImageContainer>
    )
}