import { Container, LightContainer, ListLeftContainer, ListTitleBox, Logout, LogoutContainer, PlantText, SensorBox, SensorText, SunLightText, ValueBox, ValueText } from "./styles";
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

import { FIREBASE_AUTH } from "../../../firebase";
import { db, ref, onValue, storage } from "../../../firebase"
import { getDownloadURL, ref as sRef } from 'firebase/storage';
import { set } from "firebase/database";

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();
    const sensors = ["Temperatura", "Umidade", "Nível do Tanque", "Temperatura Solo"];
    const [temp, setTemp] = useState(0);
    const [humid, setHumid] = useState(0);
    const [tanklevel, setTankLevel] = useState(0);
    const [tempsoil, setTempSoil] = useState(0);
    const [user, setUser] = useState(FIREBASE_AUTH.currentUser)
    const [loading, setLoading] = useState(true)
    // const [status, setStatus] = useState(0)
    const [lightSensor, setlightSensor] = useState(0)

    useEffect(() => {
        const data = ref(db);
        const user = FIREBASE_AUTH.currentUser;

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
                console.log(data);

                // Acessando um exemplo específico (como o título das plantas)
            } catch (error) {
                console.error('Erro ao acessar o arquivo JSON:', error);
            }
        };

        fetchData();

        onValue(data, (snapshot) => {
            setTemp(snapshot.val().temp)
            setHumid(snapshot.val().humid)
            setTankLevel(snapshot.val().tanklevel)
            setTempSoil(snapshot.val().tempsoil)
        });
        setUser(user)
        setLoading(false)
    }, [db])

    const sensorData = {
        "Temperatura": { value: temp, unit: "°C" },
        "Umidade": { value: humid, unit: "%" },
        "Nível do Tanque": { value: tanklevel, unit: "%" },
        "Temperatura Solo": { value: tempsoil, unit: "°C" }
    };

    const iconMapping = {
        "Temperatura": Thermometer,
        "Umidade": DropHalf,
        "Nível do Tanque": Waves,
        "Temperatura Solo": Thermometer
    };

    function switchLed(ledKey: string) {
        const ledRef = ref(db, `/${ledKey}`); // Caminho dinâmico para o LED
        onValue(ledRef, (snapshot) => {
            const currentStatus = snapshot.val();
            set(ledRef, currentStatus === 0 ? 1 : 0); // Alterna o estado do LED
        }, { onlyOnce: true }); // Garante que a leitura seja feita apenas uma vez
    }

    const buttonFunctions = ['led', "ledOne", "ledTwo"];

    return (
        <ImageContainer
            source={bgImg}
        >
            <HomeHeader />
            <ScrollView>

                {
                    lightSensor === 1 ? (
                        <LightContainer>
                            <SunDim
                                color="yellow"
                                weight="bold"
                                size={20}
                            />
                            <SunLightText>
                                Luz do Sol
                            </SunLightText>
                        </LightContainer>
                    ) : (
                        <LightContainer>
                            <LightbulbFilament
                                color="#B20595"
                                weight="bold"
                                size={20}
                            />
                            <SunLightText>
                                Indoor
                            </SunLightText>
                        </LightContainer>
                    )
                }


                {[...Array(3)].map((_, index) => (
                    <Container key={index}>
                        <FlatList
                            numColumns={2}
                            scrollEnabled={false} // Desabilitar o scroll interno do FlatList
                            style={{ width: "100%" }}
                            data={sensors}
                            keyExtractor={item => item}
                            ListHeaderComponent={() => (
                                <ListTitleBox>
                                    <ListLeftContainer>
                                        <PlantText>
                                            Tomate Cereja
                                        </PlantText>
                                    </ListLeftContainer>
                                </ListTitleBox>
                            )}
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
                                            {
                                                loading ?
                                                    <ValueText>
                                                        <ActivityIndicator size="small" color={theme.colors.green_700} />
                                                    </ValueText>
                                                    :
                                                    <ValueText>
                                                        {value}{unit}
                                                    </ValueText>
                                            }
                                        </ValueBox>
                                    </SensorBox>
                                );
                            }}
                            ListFooterComponent={() => (
                                <Button
                                    title="Regar plantas"
                                    type="PLAY"
                                    onPress={() => switchLed(buttonFunctions[index])}
                                    style={{ marginTop: 16, marginBottom: index === 2 ? 30 : 0 }} // Adiciona marginBottom apenas no último botão
                                />
                            )}
                        />
                    </Container>
                ))}
                {/* <LogoutContainer>
                    <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                        <Logout>
                            Logout
                        </Logout>
                    </TouchableOpacity>
                </LogoutContainer> */}
            </ScrollView>
        </ImageContainer>
    );
}
