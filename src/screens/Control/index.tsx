import bgImg from "./../../assets/bg-img-dark.png"
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";
import { Container, DropdownButton, IrrigationText, ModuleConfig, ModuleText, Timer } from "./styles";
import { CaretCircleDown } from "phosphor-react-native";
import theme from "../../theme";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";
import { useState } from "react";

export type DropProps = {
    label: string;
    value: string;
}

const data: DropProps[] =  [
    { label: 'Plantação 1', value: '1' },
    { label: 'Plantação 2', value: '2' },
    { label: 'Plantação 3', value: '3' },
  ];

//   type ControlProps = DropdownProps<typeof data>

export function Control() {
    const navigation = useNavigation<AppNavigationRoutesProps>()

    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);

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
                <DropdownButton
                    style={[isFocus && {borderColor: theme.colors.green_700}]} 
                    data={data}
                    value={value}
                    labelField="label"
                    valueField="value"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    placeholder={!isFocus ? 'Selecione a plantação' : '...'}
                    onChange={(item: DropProps) => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                />
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
                    title="Configurar plantações"
                    onPress={handleGoToConfig}
                />

            </Container>
        </ImageContainer>
    )
}