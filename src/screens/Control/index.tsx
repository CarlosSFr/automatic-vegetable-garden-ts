import bgImg from "./../../assets/bg-img-dark.png"
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";
import { Container, IrrigationText, ModuleConfig, ModuleText, Timer } from "./styles";
import { CaretCircleDown } from "phosphor-react-native";
import theme from "../../theme";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import {  } from "react-native"
import { AppNavigationRoutesProps } from "../../routes/app.routes";

export function Control() {
    const navigation = useNavigation<AppNavigationRoutesProps>()


    function handleGoToConfig() {
        navigation.navigate("modules");
    }

    return (
        <ImageContainer
            source={bgImg}
        >
            <TextHeader
                title="Controle de Irrigação"
            />
            <Container>
                <ModuleConfig>
                    <ModuleText>
                        Primeiro Módulo
                    </ModuleText>
                    <CaretCircleDown
                        size={20}
                        weight="bold"
                        color={theme.colors.gray_200}
                    />
                </ModuleConfig>
                <IrrigationText>
                    Próxima irrigação
                </IrrigationText>
                <Timer>
                    25:17
                </Timer>

                <Button
                    title="Regar plantas"
                    type="PLAY"
                    style={{ marginBottom: 14 }}
                />
                <Button
                    title="Configurar módulos"
                    onPress={handleGoToConfig}
                />

            </Container>
        </ImageContainer>
    )
}