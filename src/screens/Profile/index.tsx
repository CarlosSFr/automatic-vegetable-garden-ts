import { ScrollView, TouchableOpacity } from "react-native";
import { BackHeader } from "../../components/BackHeader";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png"
import { ChangePhotoText, Container } from "./styles";
import { ProfilePic } from "../../components/ProfilePic";
import { Input } from "../../components/Input";
import theme from "../../theme";

export function Profile() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <BackHeader
                title="Perfil"
            />
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
                    style={{ backgroundColor: theme.colors.gray_200 }}
                    placeholderColor={theme.colors.gray_700}
                />
                <Input
                    placeholder="carlos.edfrei@gmail.com"
                    style={{ backgroundColor: theme.colors.gray_200 }}
                    placeholderColor={theme.colors.gray_700}
                />

            </Container>
        </ImageContainer>
    )
}