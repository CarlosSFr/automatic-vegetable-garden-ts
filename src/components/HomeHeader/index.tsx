import { Container, HelloText, LogoContainer, TextContainer, UserName } from "./styles";
import { ProfilePic } from "../ProfilePic";
import logo from "./../../assets/logo.png"
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../../../firebase";

export function HomeHeader() {
    const navigation = useNavigation<AppNavigationRoutesProps>()

    function handleGoToProfile() {
        navigation.navigate("profile")
    }

    return (
        <Container>
            <StatusBar
                translucent
                style="light"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={handleGoToProfile} >
                    <ProfilePic
                        source={{ uri: "https://github.com/CarlosSFr.png" }}
                        size={60}
                    />
                </TouchableOpacity>
                <TextContainer>
                    <HelloText>
                        Olá,
                    </HelloText>
                    <UserName>
                        {FIREBASE_AUTH.currentUser?.displayName}
                    </UserName>
                </TextContainer>
            </View>
            <LogoContainer
                source={logo}
            />
        </Container>
    )
}