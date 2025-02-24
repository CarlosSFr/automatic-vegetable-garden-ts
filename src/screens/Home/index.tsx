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
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { ImageContainer } from "./styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Thermometer, DropHalf, SunDim, Waves, LightbulbFilament } from "phosphor-react-native";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

import { FIREBASE_AUTH } from "../../firebase/firebase";
import { db, ref, onValue, storage } from "../../firebase/firebase";
import { set } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

type ModuleData = {
    temp: number;
    humid: number;
    tankLevel: number;
    tempSoil: number;
    umidSoil: number;
    details: {
        title: string,
        idealUmid: string,
        idealSoil: string,
        idealTemp: number,
    };
};

type ModulesData = {
    moduleOne: ModuleData;
    moduleTwo: ModuleData;
    moduleThree: ModuleData;
};

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();

    const sensors: string[] = ["Temp. do Solo", "Umidade do Solo"];
    const [modulesData, setModulesData] = useState<ModulesData>({
        moduleOne: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, umidSoil: 0, details: { title: "", idealUmid: "", idealSoil: "", idealTemp: 0 } },
        moduleTwo: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, umidSoil: 0, details: { title: "", idealUmid: "", idealSoil: "", idealTemp: 0 } },
        moduleThree: { temp: 0, humid: 0, tankLevel: 0, tempSoil: 0, umidSoil: 0, details: { title: "", idealUmid: "", idealSoil: "", idealTemp: 0 } },
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
        const relayRef = ref(db, `/relayStatus`);
        const uvRef = ref(db, `/uvLight`);

        onValue(uvRef, (snapshot) => {
            const uvData = snapshot.val();
            if (uvData > 3) {
                set(relayRef, 1);
                setLightSensor(1);
            } else {
                set(relayRef, 0);
                setLightSensor(0);
            }
        })

    }, []);

    // useEffect(() => {

    //     if(modulesData.moduleOne.umidSoil < modulesData.moduleOne.details.idealTemp){
    //         switchLed(`${moduleKey}/bomb`, moduleData)
    //     }

    // }, [modulesData.moduleOne.umidSoil, modulesData.moduleTwo.umidSoil, modulesData.moduleThree.umidSoil]);

    const iconMapping: Record<string, React.ElementType> = {
        "Temp. do Solo": Thermometer,
        "Umidade do Solo": DropHalf,
    };

    const sensorMapping: Record<string, keyof ModuleData> = {
        "Temp. do Solo": "tempSoil",
        "Umidade do Solo": "umidSoil",
    };

    // const switchLed = async (ledKey: string, moduleData: ModuleData) => {
    //     const ledRef = ref(db, `/${ledKey}`);
    //     const now = new Date();
    //     const timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString(); // Ajusta para UTC-3
    //     const humidity = moduleData.humid; // Captura a umidade atual

    //     // Obtém o estado atual do LED e alterna entre 0 e 1
    //     onValue(ledRef, (snapshot) => {
    //         const currentStatus = snapshot.val();
    //         set(ledRef, currentStatus === 0 ? 1 : 0);

    //     }, { onlyOnce: true });

    //     const newEntry = {
    //         timestamp,
    //         humidity,
    //         action: "Regar plantas",
    //         module: ledKey,
    //         name: moduleData.details.title,
    //     };

    //     try {
    //         const historyRef = sRef(storage, "History/history.json");
    //         let historyData = [];

    //         try {
    //             const url = await getDownloadURL(historyRef);
    //             const response = await fetch(url);
    //             historyData = await response.json();
    //         } catch {
    //             console.warn("Arquivo não encontrado. Criando novo histórico...");
    //         }

    //         historyData.push(newEntry);

    //         const jsonString = JSON.stringify(historyData, null, 2);
    //         const blob = new Blob([jsonString], { type: "application/json" });
    //         await uploadBytes(historyRef, blob);

    //         console.log("Histórico atualizado com sucesso!");
    //     } catch (error) {
    //         console.error("Erro ao atualizar o histórico:", error);
    //     }
    // };

    const switchLed = async (ledKey: string, moduleData: ModuleData) => {
        const ledRef = ref(db, `/${ledKey}`);
        const now = new Date();
        const timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
        const humidity = moduleData.umidSoil;

        try {
            // Define o LED como 1 (ligado)
            await set(ledRef, 1);

            // Aguarda 1 segundo
            setTimeout(async () => {
                // Define o LED de volta para 0 (desligado)
                await set(ledRef, 0);
            }, 8000);

            const newEntry = {
                timestamp,
                humidity,
                action: "Regar plantas",
                module: ledKey,
                name: moduleData.details.title,
            };

            const historyRef = sRef(storage, "History/history.json");
            let historyData = [];

            try {
                const url = await getDownloadURL(historyRef);
                const response = await fetch(url);
                historyData = await response.json();
            } catch {
                console.warn("Arquivo não encontrado. Criando novo histórico...");
            }

            historyData.push(newEntry);

            const jsonString = JSON.stringify(historyData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            await uploadBytes(historyRef, blob);

            console.log("Histórico atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o histórico:", error);
        }
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
                                const unit = item === "Temp. do Solo" ? "°C" : "%";
                                const isIdealInfo = item === "Temp. do Solo" || item === "Umidade do Solo";

                                // Definição do texto ideal
                                const idealText =
                                    item === "Temp. do Solo" ? `Temp. Ideal: ${moduleData.details.idealSoil}` :
                                        item === "Umidade do Solo" ? `Umid. Ideal: ${moduleData.details.idealUmid}` : "";

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
                                    onPress={() => switchLed(`${moduleKey}/bomb`, moduleData)}
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
