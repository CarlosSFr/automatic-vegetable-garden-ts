import { Container, HelloText, LogoContainer, TextContainer, UserName } from "./styles";
import { ProfilePic } from "../ProfilePic";
import logo from "./../../assets/logo.png"
import { TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../../../firebase";
import defaultPic from "./../../assets/user.png"
import { useCallback, useState } from "react";

export function HomeHeader() {
    const navigation = useNavigation<AppNavigationRoutesProps>()
    const [userName, setUserName] = useState(FIREBASE_AUTH.currentUser?.displayName || '');
    const [userPhoto, setUserPhoto] = useState(FIREBASE_AUTH.currentUser?.photoURL)

    function handleGoToProfile() {
        navigation.navigate("profile")
    }

    useFocusEffect(
        useCallback(() => {   
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                setUserName(user.displayName || '');
                setTimeout(() => setUserPhoto(user.photoURL), 2500)
            }
        }, [userPhoto])
    );

    return (
        <Container>
            <StatusBar
                translucent
                style="light"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={handleGoToProfile} >
                    <ProfilePic
                        source={
                            userPhoto ?
                                { uri: userPhoto }
                                : defaultPic
                        }
                        size={60}
                    />
                </TouchableOpacity>
                <TextContainer>
                    <HelloText>
                        Olá,
                    </HelloText>
                    <UserName>
                        {userName}
                    </UserName>
                </TextContainer>
            </View>
            <LogoContainer
                source={logo}
            />
        </Container>
    )
}