import { Container, TextContainer } from "./styles";
import { StatusBar } from "expo-status-bar";
import logo from "./../../assets/logo.png"
import { LogoContainer } from "../HomeHeader/styles";
import { CaretLeft } from "phosphor-react-native";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

type Props = {
    title: string;
}

export function BackHeader({ title }: Props) {
    const navigation = useNavigation<AppNavigationRoutesProps>()


    function handleGoBackProfile() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                translucent
                style="light"
            />
            <TouchableOpacity onPress={handleGoBackProfile} >
                <CaretLeft
                    size={32}
                    color={theme.colors.white}
                />
            </TouchableOpacity>
            <TextContainer>
                {title}
            </TextContainer>
            <LogoContainer
                source={logo}
            />
        </Container>
    )
}