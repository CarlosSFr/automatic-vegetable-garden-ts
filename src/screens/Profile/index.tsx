import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { BackHeader } from "../../components/BackHeader";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png"
import { ChangePass, ChangePhotoText, Container, ContainerLeft } from "./styles";
import { ProfilePic } from "../../components/ProfilePic";
import { Input } from "../../components/Input";
import theme from "../../theme";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

type FormProfileProps = {
    name: string;
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

const profileSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    oldPassword: yup.string().required("Informe a senha.").min(6, "A senha deve ter no mínimo 6 digitos."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter no mínimo 6 digitos."),
    confirmPassword: yup.string().required("Confirme a senha.").oneOf([yup.ref("password")], "A senha não confere.")
})

export function Profile() {
    const [userPhoto, setUserPhoto] = useState("https://github.com/CarlosSFr.png")
    const { control, handleSubmit, formState: { errors } } = useForm<FormProfileProps>({
        resolver: yupResolver(profileSchema)
    });

    async function handleUserPhotoSelect() {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true,
        });

        if (photoSelected.canceled) {
            return;
        }

        if (photoSelected.assets[0].uri) {
            const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

            if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                return Alert.alert("Escolha uma imagem de até 5MB")
            }

            setUserPhoto(photoSelected.assets[0].uri);
        }

    }

    function handleChangeData(data: any) {
        console.log(data)
    }

    return (
        <ImageContainer
            source={bgImg}
        >
            <BackHeader
                title="Perfil"
            />
            <ScrollView>
                <Container>
                    <ProfilePic
                        size={148}
                        source={{ uri: userPhoto }}
                    />

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <ChangePhotoText>
                            Alterar foto
                        </ChangePhotoText>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome do usuário"
                                onChangeText={onChange}
                                value={value}
                                style={{ backgroundColor: theme.colors.off_white }}
                                placeholderColor={theme.colors.gray_700}
                            />
                        )}
                    />
                    {errors.name && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold", width: "100%" }}>
                            {errors.name.message}
                        </Text>
                    )}

                    <Input
                        placeholder="carlos.edfrei@gmail.com"
                        style={{ backgroundColor: theme.colors.gray_200 }}
                        placeholderColor={theme.colors.gray_300}
                        editable={false}
                    />
                </Container>
                <ContainerLeft>
                    <ChangePass>
                        Alterar senha
                    </ChangePass>
                    <Controller
                        control={control}
                        name="oldPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha antiga"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.oldPassword && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold" }}>
                            {errors.oldPassword.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nova senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold" }}>
                            {errors.password.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a nova senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.confirmPassword && (
                        <Text style={{ color: "red", marginTop: 5, marginBottom: -5, fontWeight: "bold" }}>
                            {errors.confirmPassword.message}
                        </Text>
                    )}

                    <Button
                        title="Alterar"
                        style={{ marginTop: 30 }}
                        onPress={handleSubmit(handleChangeData)}
                    />
                </ContainerLeft>
            </ScrollView>
        </ImageContainer>
    )
}