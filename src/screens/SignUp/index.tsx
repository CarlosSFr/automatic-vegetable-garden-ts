import { ImageContainer, Subtitle } from "../SignIn/styles";
import { ButtonContainer, Container, GoogleButton, GoogleButtonText, SideLines, SmallText, StyleContainer } from "./styles";
import imgBg from "./../../assets/bg-img.png"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { GoogleLogo } from "phosphor-react-native"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, Text } from "react-native";

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
            <ScrollView>
            <Container>
                <Subtitle style={{ fontWeight: 'bold', paddingBottom: 20 }}>
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
                    {errors.name && (
                        <Text style={{color: "red", marginTop: 5, marginBottom: -5}}>
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
            </ScrollView>
        </ImageContainer>
    )
}