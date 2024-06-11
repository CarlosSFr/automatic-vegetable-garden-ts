import { ImageContainer, Subtitle } from "../SignIn/styles";
import { ButtonContainer, Container, GoogleButton, GoogleButtonText, SideLines, SmallText, StyleContainer } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { GoogleLogo } from "phosphor-react-native"
import { Controller, useForm } from "react-hook-form"
import { Text } from "react-native";

type FormDataProps = {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();

    function handleSignUp(data: any) {

    }

    return (
        <ImageContainer
            source={imgBg}
            defaultSource={imgBg}
        >
            <Container>
                <Subtitle style={{ fontWeight: 'bold', paddingBottom: 40 }}>
                    Faça seu cadastro
                </Subtitle>

                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: "Informe o nome."
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Seu nome"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={{ color: "red" }}>
                    {errors.name?.message}
                </Text>

                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Telefone"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "Informe o nome.",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'E-mail inválido'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="E-mail"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Senha"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

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
                        />
                    )}
                />

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
        </ImageContainer>
    )
}