import { Container, ListLeftContainer, ListRightContainer, ListTitleBox, Logout, LogoutContainer, PlantText, SensorBox, SensorText, SunLightText, ValueBox, ValueText } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { HomeHeader } from "../../components/HomeHeader";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { ImageContainer } from "../SignIn/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Thermometer, DropHalf, Flask, SunDim, Waves } from "phosphor-react-native";
import theme from "../../theme";

import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

import { FIREBASE_AUTH } from "../../../firebase";
import { db, ref, onValue } from "../../../firebase";
import { set } from "firebase/database";
import { SensorsTest } from "../Home/styles";

interface Plant {
    ideal: {
        temperatura: string;
        umidade: string;
    };
    name: string;
    sensors: {
        humid: number;
        tanklevel: number;
        temp: number;
        tempsolo: number;
    };
}

export function HomeTest() {
    const navigation = useNavigation<AppNavigationRoutesProps>();
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        const plantsRef = ref(db, '/plants');
        onValue(plantsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const plantList = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key
                }));
                setPlants(plantList);
            }
        });
    }, []);

    function switchLedOne(plantName: string) {
        const ledRef = ref(db, `/plants/${plantName}/led`);
        onValue(ledRef, (snapshot) => {
            const currentStatus = snapshot.val();
            set(ledRef, currentStatus === 0 ? 1 : 0); // Alternando o valor do LED
        });
    }

    console.log(plants)

    return (
        <ImageContainer source={bgImg}>
            <HomeHeader />
            <Container>
                <FlatList
                    data={plants}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <SensorsTest>
                            <SensorBox>
                                <SensorText>Temperatura</SensorText>
                                <ValueBox>
                                    <Thermometer color={theme.colors.green_700} weight="bold" size={32} />
                                    <ValueText>{item.name}°C</ValueText>
                                </ValueBox>
                                <SensorText>Umidade</SensorText>
                                <ValueBox>
                                    <DropHalf color={theme.colors.green_700} weight="bold" size={32} />
                                    <ValueText>{item.name}%</ValueText>
                                </ValueBox>
                                {/* Adicione mais sensores aqui, como Nível do Tanque ou Temperatura do Solo */}
                            </SensorBox>
                            <Button
                                title={`Regar ${item.name}`}
                                type="PLAY"
                                onPress={() => switchLedOne(item.name)}
                            />
                        </SensorsTest>
                    )}
                />
                <LogoutContainer>
                    <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                        <Logout>Logout</Logout>
                    </TouchableOpacity>
                </LogoutContainer>
            </Container>
        </ImageContainer>
    );
}
