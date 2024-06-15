import { Container, Logout, LogoutContainer, SensorBox, SensorText, ValueBox, ValueText } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { HomeHeader } from "../../components/HomeHeader";
import { FlatList, TouchableOpacity } from "react-native";
import { ImageContainer } from "../SignIn/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Thermometer, DropHalf, Flask, SunDim } from "phosphor-react-native";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";
import { FIREBASE_AUTH } from "../../../firebaseESP";

import { db, ref, onValue } from "../../../firebaseESP"

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();
    const sensors = ["Temperatura", "Umidade", "Luminosidade", "pH"];
    const [temp, setTemp] = useState(0);
    const [humid, setHumid] = useState(0);

    useEffect(() => {
        const data = ref(db);

        onValue(data, (snapshot) => {
            setTemp(snapshot.val().temp)
            setHumid(snapshot.val().humid)
        });
    }, [db])

    const sensorData = {
        "Temperatura": { value: temp, unit: "°C" },
        "Umidade": { value: humid, unit: "%" },
        "Luminosidade": { value: "80", unit: "" },
        "pH": { value: "7.6", unit: "" }
    };

    const iconMapping = {
        "Temperatura": Thermometer,
        "Umidade": DropHalf,
        "Luminosidade": SunDim,
        "pH": Flask
    };

    function handleGoToPlantData() {
        navigation.navigate("plantData");
    }

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
                    onPress={handleGoToPlantData}
                />

                <LogoutContainer>
                    <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                        <Logout>
                            Logout
                        </Logout>
                    </TouchableOpacity>
                </LogoutContainer>
            </Container>
        </ImageContainer>
    );
}
