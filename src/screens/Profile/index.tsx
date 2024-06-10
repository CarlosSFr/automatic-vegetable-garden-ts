import { Alert, ScrollView, TouchableOpacity } from "react-native";
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

export function Profile() {
    const [userPhoto, setUserPhoto] = useState("https://github.com/CarlosSFr.png")

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

        if(photoSelected.assets[0].uri){
            // const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
            
            // if(photoInfo.exists && photoInfo.size / 1024 / 1024 > 4){
            //     return Alert.alert("Escolha uma imagem de até 5MB")
            // }

            setUserPhoto(photoSelected.assets[0].uri);
        }
        
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
                    <Input
                        placeholder="Carlos Eduardo"
                        style={{ backgroundColor: theme.colors.off_white }}
                        placeholderColor={theme.colors.gray_700}
                    />
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
                    <Input
                        placeholder="Senha antiga"
                        style={{ backgroundColor: theme.colors.off_white }}
                        placeholderColor={theme.colors.gray_300}
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova senha"
                        style={{ backgroundColor: theme.colors.off_white }}
                        placeholderColor={theme.colors.gray_300}
                        secureTextEntry
                    />
                    <Input
                        placeholder="Confirme a nova senha"
                        style={{ backgroundColor: theme.colors.off_white }}
                        placeholderColor={theme.colors.gray_300}
                        secureTextEntry
                    />
                    <Button
                        title="Alterar"
                        style={{ marginTop: 30 }}
                    />
                </ContainerLeft>
            </ScrollView>
        </ImageContainer>
    )
}