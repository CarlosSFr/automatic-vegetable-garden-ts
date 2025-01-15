import {
    Container,
    LightContainer,
    ListLeftContainer,
    ListTitleBox,
    PlantText,
    SensorBox,
    SensorText,
    SunLightText,
    ValueBox,
    ValueText
} from "./styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { HomeHeader } from "../../components/HomeHeader";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { ImageContainer } from "./styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Thermometer, DropHalf, SunDim, Waves, LightbulbFilament } from "phosphor-react-native";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

import { FIREBASE_AUTH } from "../../../firebase";
import { db, ref, onValue, storage } from "../../../firebase";
import { set } from "firebase/database";
import { getDownloadURL, ref as sRef } from 'firebase/storage';

type ModuleData = {
    temp: number;
    humid: number;
    tankLevel: number;
    tempSoil: number;
    name: string;
};

type ModulesData = {
    moduleOne: ModuleData;
    moduleTwo: ModuleData;
    moduleThree: ModuleData;
};

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();

    const sensors: string[] = ["Temperatura", "Umidade", "Nível do Tanque", "Temperatura Solo"];
    const [modulesData, setModulesData] = useState<ModulesData>({
        moduleOne: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, name: "" },
        moduleTwo: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, name: "" },
        moduleThree: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, name: "" },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [lightSensor, setLightSensor] = useState<number>(0);

    useEffect(() => {
        const moduleRefs: Record<keyof ModulesData, any> = {
            moduleOne: ref(db, "/moduleOne"),
            moduleTwo: ref(db, "/moduleTwo"),
            moduleThree: ref(db, "/moduleThree"),
        };

        Object.entries(moduleRefs).forEach(([key, moduleRef]) => {
            onValue(moduleRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setModulesData((prev) => ({
                        ...prev,
                        [key as keyof ModulesData]: { ...prev[key as keyof ModulesData], ...data },
                    }));
                }
            });
        });

        const fetchData = async () => {
            try {
                // Referência ao arquivo JSON no Firebase Storage
                const reference = sRef(storage, "PlantData/data.json")

                // Baixar o arquivo JSON como string
                const url = await getDownloadURL(reference);

                // Buscar o arquivo via URL e transformá-lo em JSON
                const response = await fetch(url);
                const data = await response.json();

                // Exibindo o conteúdo do arquivo JSON no console
                //console.log(data);

                // Acessando um exemplo específico (como o título das plantas)
            } catch (error) {
                console.error('Erro ao acessar o arquivo JSON:', error);
            }
        };

        fetchData();

        setLoading(false);
    }, []);

    useEffect(() => {
        if (modulesData.moduleOne.humid > 60) {
            setLightSensor(1); // Atualiza o lightSensor para "Indoor"
        } else {
            setLightSensor(0); // Define o lightSensor para "Luz do Sol"
        }
    }, [modulesData.moduleOne.humid]);

    const iconMapping: Record<string, React.ElementType> = {
        "Temperatura": Thermometer,
        "Umidade": DropHalf,
        "Nível do Tanque": Waves,
        "Temperatura Solo": Thermometer,
    };

    const sensorMapping: Record<string, keyof ModuleData> = {
        "Temperatura": "temp",
        "Umidade": "humid",
        "Nível do Tanque": "tankLevel",
        "Temperatura Solo": "tempSoil",
    };

    const switchLed = (ledKey: string) => {
        const ledRef = ref(db, `/${ledKey}`);
        onValue(ledRef, (snapshot) => {
            const currentStatus = snapshot.val();
            set(ledRef, currentStatus === 0 ? 1 : 0);
        }, { onlyOnce: true });
    };

    return (
        <ImageContainer source={bgImg}>
            <HomeHeader />
            <ScrollView>
                {lightSensor === 0 ? (
                    <LightContainer>
                        <SunDim color="yellow" weight="bold" size={20} />
                        <SunLightText>Luz do Sol</SunLightText>
                    </LightContainer>
                ) : (
                    <LightContainer>
                        <LightbulbFilament color="#B20595" weight="bold" size={20} />
                        <SunLightText>Indoor</SunLightText>
                    </LightContainer>
                )}

                {Object.entries(modulesData).map(([moduleKey, moduleData], index) => (
                    <Container key={moduleKey}>
                        <FlatList
                            numColumns={2}
                            scrollEnabled={false}
                            style={{ width: "100%" }}
                            data={sensors}
                            keyExtractor={(item) => item}
                            ListHeaderComponent={() => (
                                <ListTitleBox>
                                    <ListLeftContainer>
                                        <PlantText>{moduleData.name || "Planta"}</PlantText>
                                    </ListLeftContainer>
                                </ListTitleBox>
                            )}
                            renderItem={({ item }) => {
                                const Icon = iconMapping[item];
                                const value = moduleData[sensorMapping[item]];
                                const unit = item === "Temperatura" || item === "Temperatura Solo" ? "°C" : item === "Nível do Tanque" ? "%" : "";
                                return (
                                    <SensorBox>
                                        <SensorText>{item}</SensorText>
                                        <ValueBox>
                                            <Icon color={theme.colors.green_700} weight="bold" size={32} />
                                            {loading ? (
                                                <ValueText>
                                                    <ActivityIndicator size="small" color={theme.colors.green_700} />
                                                </ValueText>
                                            ) : (
                                                <ValueText>
                                                    {value}{unit}
                                                </ValueText>
                                            )}
                                        </ValueBox>
                                    </SensorBox>
                                );
                            }}
                            ListFooterComponent={() => (
                                <Button
                                    title="Regar plantas"
                                    type="PLAY"
                                    onPress={() => switchLed(`${moduleKey}/bomb`)}
                                    style={{ marginTop: 16, marginBottom: index === 2 ? 30 : 0 }}
                                />
                            )}
                        />
                    </Container>
                ))}
            </ScrollView>
        </ImageContainer>
    );
}
