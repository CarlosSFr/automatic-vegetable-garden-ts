import {
    Container,
    GeneralDataContainer,
    IdealText,
    LightContainer,
    ListLeftContainer,
    ListTitleBox,
    PlantText,
    SensorBox,
    SensorsDataContainer,
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
    details: {
        title: string,
        idealUmid: string,
        idealTemp: string,
    };
};

type ModulesData = {
    moduleOne: ModuleData;
    moduleTwo: ModuleData;
    moduleThree: ModuleData;
};

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();

    const sensors: string[] = ["Temperatura", "Umidade"];
    const [modulesData, setModulesData] = useState<ModulesData>({
        moduleOne: { temp: 0, humid: 0, tankLevel: 0, details: { title: "", idealUmid: "", idealTemp: "" } },
        moduleTwo: { temp: 0, humid: 0, tankLevel: 0, details: { title: "", idealUmid: "", idealTemp: "" } },
        moduleThree: { temp: 0, humid: 0, tankLevel: 0, details: { title: "", idealUmid: "", idealTemp: "" } },
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
    };

    const sensorMapping: Record<string, keyof ModuleData> = {
        "Temperatura": "temp",
        "Umidade": "humid",
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
                    <GeneralDataContainer>
                        <SensorsDataContainer>
                            <LightContainer>
                                <SunDim color="yellow" weight="bold" size={20} />
                                <SunLightText>Luz do Sol</SunLightText>
                            </LightContainer>
                            <LightContainer>
                                <Waves color={theme.colors.blue_water} weight="bold" size={20} />
                                <SunLightText>Nível do tanque {modulesData.moduleOne.tankLevel}%</SunLightText>
                            </LightContainer>
                        </SensorsDataContainer>
                        <SensorsDataContainer>
                            <LightContainer>
                                <DropHalf color={theme.colors.blue_water} weight="bold" size={20} />
                                <SunLightText>Umidade {modulesData.moduleOne.humid}%</SunLightText>
                            </LightContainer>
                            <LightContainer>
                                <Thermometer color={theme.colors.red_dark} weight="bold" size={20} />
                                <SunLightText>Temperatura {modulesData.moduleOne.temp}ºC</SunLightText>
                            </LightContainer>
                        </SensorsDataContainer>
                    </GeneralDataContainer>
                ) : (
                    <GeneralDataContainer>
                        <SensorsDataContainer>
                            <LightContainer>
                                <LightbulbFilament color="#B20595" weight="bold" size={20} />
                                <SunLightText>Indoor</SunLightText>
                            </LightContainer>
                            <LightContainer>
                                <Waves color={theme.colors.blue_water} weight="bold" size={20} />
                                <SunLightText>Nível do tanque {modulesData.moduleOne.tankLevel}%</SunLightText>
                            </LightContainer>
                        </SensorsDataContainer>
                        <SensorsDataContainer>
                            <LightContainer>
                                <DropHalf color={theme.colors.blue_water} weight="bold" size={20} />
                                <SunLightText>Umidade {modulesData.moduleOne.humid}%</SunLightText>
                            </LightContainer>
                            <LightContainer>
                                <Thermometer color={theme.colors.red_dark} weight="bold" size={20} />
                                <SunLightText>Temperatura {modulesData.moduleOne.temp}ºC</SunLightText>
                            </LightContainer>
                        </SensorsDataContainer>
                    </GeneralDataContainer>
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
                                        <PlantText>{moduleData.details.title || "Planta"}</PlantText>
                                    </ListLeftContainer>
                                </ListTitleBox>
                            )}
                            renderItem={({ item }) => {
                                const Icon = iconMapping[item];
                                const value = moduleData[sensorMapping[item]];
                                const unit = item === "Temperatura" ? "°C" : "";
                                const isIdealInfo = item === "Temperatura" || item === "Umidade";

                                // Definição do texto ideal
                                const idealText =
                                    item === "Temperatura" ? `Temp. Ideal: ${moduleData.details.idealTemp}` :
                                        item === "Umidade" ? `Umid. Ideal: ${moduleData.details.idealUmid}` : "";

                                // Verifica se o valor é numérico (para garantir que não estamos tentando renderizar um objeto)
                                const renderValue = typeof value === 'number' ? (
                                    <ValueText>{value}{unit}</ValueText>
                                ) : (
                                    <ValueText>N/A</ValueText>
                                );

                                return (
                                    <SensorBox>
                                        <SensorText>{item}</SensorText>
                                        <ValueBox style={{ paddingBottom: isIdealInfo ? 0 : 14 }}>
                                            <Icon color={theme.colors.green_700} weight="bold" size={32} />
                                            {loading ? (
                                                <ValueText>
                                                    <ActivityIndicator size="small" color={theme.colors.green_700} />
                                                </ValueText>
                                            ) : (
                                                renderValue
                                            )}
                                        </ValueBox>
                                        {isIdealInfo && <IdealText>{idealText}</IdealText>}
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
