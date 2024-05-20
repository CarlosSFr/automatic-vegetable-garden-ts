import { Container, Logout, LogoutContainer, SensorBox, SensorText, ValueBox, ValueText } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { HomeHeader } from "../../components/HomeHeader";
import { FlatList, TouchableOpacity } from "react-native";
import { ImageContainer } from "../SignIn/styles";
import { Button } from "../../components/Button";
import { useState } from "react";
import { Thermometer, DropHalf, Flask, SunDim } from "phosphor-react-native";
import theme from "../../theme";

export function Home() {
    const [sensors, setSensors] = useState(["Temperatura", "Umidade", "Luminosidade", "pH"]);
    const sensorData = {
        "Temperatura": { value: "14", unit: "°C" },
        "Umidade": { value: "70", unit: "%" },
        "Luminosidade": { value: "80", unit: "" },
        "pH": { value: "7.6", unit: "" }
    };
    const iconMapping = {
        "Temperatura": Thermometer,
        "Umidade": DropHalf,
        "Luminosidade": SunDim,
        "pH": Flask
    };

    return (
        <ImageContainer
            source={bgImg}
        >
            <HomeHeader />
            <Container>
                <FlatList
                    numColumns={2}
                    scrollEnabled={false}
                    style={{ width: "100%" }}
                    data={sensors}
                    keyExtractor={item => item}
                    renderItem={({ item }) => {
                        const Icon = iconMapping[item as keyof typeof iconMapping];
                        const { value, unit } = sensorData[item as keyof typeof sensorData];
                        return (
                            <SensorBox>
                                <SensorText>{item}</SensorText>
                                <ValueBox>
                                    <Icon
                                        color={theme.colors.green_700}
                                        weight="bold"
                                        size={32}
                                    />
                                    <ValueText>
                                        {value}{unit}
                                    </ValueText>
                                </ValueBox>
                            </SensorBox>
                        );
                    }}
                />

                <Button
                    title="Acessar dados"
                    type="DATA"
                    style={{ marginBottom: 60 }}
                />

                <LogoutContainer>
                    <TouchableOpacity>
                        <Logout>
                            Logout
                        </Logout>
                    </TouchableOpacity>
                </LogoutContainer>
            </Container>
        </ImageContainer>
    );
}
