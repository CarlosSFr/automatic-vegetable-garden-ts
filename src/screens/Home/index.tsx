import { Container, Logout, LogoutContainer} from "./styles";

import bgImg from "./../../assets/bg-img-dark.png"
import { HomeHeader } from "../../components/HomeHeader";
import { Text, TouchableOpacity } from "react-native";
import { ImageContainer } from "../SignIn/styles";

export function Home() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <HomeHeader />
            <Container>
                <LogoutContainer>
                    <TouchableOpacity>
                        <Logout>
                             Logout
                        </Logout>
                    </TouchableOpacity>
                </LogoutContainer>
            </Container>
        </ImageContainer>
    )
}