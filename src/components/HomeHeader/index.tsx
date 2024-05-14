import { Container, HelloText, LogoContainer, TextContainer, UserName } from "./styles";
import { ProfilePic } from "../ProfilePic";
import logo from "./../../assets/logo.png"
import { View } from "react-native";


export function HomeHeader() {
    return (
        <Container>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <ProfilePic 
                    source={{uri: "https://github.com/CarlosSFr.png"}}
                    size={60}
                />
                <TextContainer>
                    <HelloText>
                        Olá,
                    </HelloText>
                    <UserName>
                        Carlos Freitas
                    </UserName>
                </TextContainer>
            </View>
            <LogoContainer 
                source={logo}
            />
        </Container>
    )
}