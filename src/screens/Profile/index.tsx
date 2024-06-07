import { ScrollView, TouchableOpacity } from "react-native";
import { BackHeader } from "../../components/BackHeader";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png"
import { ChangePass, ChangePhotoText, Container, ContainerLeft } from "./styles";
import { ProfilePic } from "../../components/ProfilePic";
import { Input } from "../../components/Input";
import theme from "../../theme";
import { Button } from "../../components/Button";

export function Profile() {
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
                        source={{ uri: "https://github.com/CarlosSFr.png" }}
                    />
                    <TouchableOpacity>
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