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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { FIREBASE_AUTH, uploadProfilePic } from "../../firebase/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import defaultPic from "./../../assets/user.png"

type FormProfileProps = {
    name: string;
    oldPassword?: string;
    password?: string | null | undefined;
    confirmPassword?: string | null | undefined;
}

const profileSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    password: yup.string()
        .min(6, "A senha deve ter no mínimo 6 digitos.")
        .nullable()
        .transform((value) => !!value ? value : null),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "A senha não confere.")
        .nullable()
        .transform((value) => !!value ? value : null)
        .when("password", {
            is: (Field: any) => Field,
            then: (schema) => schema.nullable()
                .required("Informe a confirmação da senha")
                .transform((value) => !!value ? value : null)
        })
});

export function Profile() {
    const [userPhoto, setUserPhoto] = useState("")
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm<FormProfileProps>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: String(FIREBASE_AUTH.currentUser?.displayName)
        }
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

            const user = FIREBASE_AUTH.currentUser;

            await uploadProfilePic(photoSelected.assets[0].uri, user);

        }
    }

    async function handleProfileUpdate(data: FormProfileProps) {
        const user = FIREBASE_AUTH.currentUser;

        if (user && data.password) {
            try {
                setLoading(true);
                // Reauthenticate user before updating password
                const userEmail = user.email;
                if (userEmail && data.oldPassword) {
                    const credential = EmailAuthProvider.credential(userEmail, data.oldPassword);
                    await reauthenticateWithCredential(user, credential);
                } else {
                    throw new Error('Senha antiga não informada');
                }
                // Update password and profile
                await updatePassword(user, data.password);
                await updateProfile(user, { displayName: data.name });
                Toast.show({
                    type: "success",
                    text1: "Sucesso!",
                    text2: "Senha e perfil atualizados com sucesso!",
                    visibilityTime: 1500,
                    position: "bottom"
                });
            } catch (error: any) {
                if (error.code === 'auth/wrong-password') {
                    Toast.show({
                        type: "error",
                        text1: "Erro.",
                        text2: "Senha antiga incorreta",
                        visibilityTime: 1500,
                        position: "bottom"
                    });
                } else if (error.code === 'auth/requires-recent-login') {
                    Toast.show({
                        type: "error",
                        text1: "Erro.",
                        text2: "Reautenticação necessária. Faça login novamente.",
                        visibilityTime: 1500,
                        position: "bottom"
                    });
                }
                else if (error.code === 'auth/invalid-credential') {
                    Toast.show({
                        type: "error",
                        text1: "Erro.",
                        text2: "Senha antiga incorreta.",
                        visibilityTime: 1500,
                        position: "bottom"
                    });
                } else {
                    Toast.show({
                        type: "error",
                        text1: "Erro.",
                        text2: "Não foi possível atualizar a senha",
                        visibilityTime: 1500,
                        position: "bottom"
                    });
                }
            } finally {
                setLoading(false);
            }
        }
        // reset()
    }

    useEffect(() => {
        const userPic = FIREBASE_AUTH.currentUser?.photoURL;
        if (userPic) {
            setUserPhoto(userPic)
        }
    }, [])

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
                        source={
                            userPhoto ?
                                { uri: userPhoto }
                                : defaultPic
                        }
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
                                placeholder="Nome"
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
                        placeholder={String(FIREBASE_AUTH.currentUser?.email)}
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

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Nova senha"
                                onChangeText={onChange}
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
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Confirme a nova senha"
                                onChangeText={onChange}
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={handleSubmit(handleProfileUpdate)}
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
                        onPress={handleSubmit(handleProfileUpdate)}
                        loading={loading}
                    />
                </ContainerLeft>
            </ScrollView>
        </ImageContainer>
    )
}