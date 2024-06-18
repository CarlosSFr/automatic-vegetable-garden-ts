import { Container, Logout, LogoutContainer, SensorBox, SensorText, ValueBox, ValueText } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { HomeHeader } from "../../components/HomeHeader";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { ImageContainer } from "../SignIn/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Thermometer, DropHalf, Flask, SunDim } from "phosphor-react-native";
import theme from "../../theme";

import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

import { FIREBASE_AUTH } from "../../../firebase";
import { db, ref, onValue } from "../../../firebase"

import { printToFileAsync } from "expo-print"
import { shareAsync } from "expo-sharing"

export function Home() {
    const navigation = useNavigation<AppNavigationRoutesProps>();
    const sensors = ["Temperatura", "Umidade", "Luminosidade", "pH"];
    const [temp, setTemp] = useState(0);
    const [humid, setHumid] = useState(0);
    const [user, setUser] = useState(FIREBASE_AUTH.currentUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const data = ref(db);
        const user = FIREBASE_AUTH.currentUser;

        onValue(data, (snapshot) => {
            setTemp(snapshot.val().temp)
            setHumid(snapshot.val().humid)
        });
        setUser(user)
        setLoading(false)
    }, [db])

    const sensorData = {
        "Temperatura": { value: temp, unit: "°C" },
        "Umidade": { value: humid, unit: "%" },
        "Luminosidade": { value: "80", unit: "" },
        "pH": { value: "6.6", unit: "" }
    };

    const iconMapping = {
        "Temperatura": Thermometer,
        "Umidade": DropHalf,
        "Luminosidade": SunDim,
        "pH": Flask
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const html = `
        <html>
            <body style="padding: 30px">
                <h1 style="font-weight: bold" >Relatório de usuário: ${user?.displayName}</h1>
                <br>
                <p style="font-weight: bold">Informações sobre o usuário:</p>
                <p><strong>Email:</strong> ${user?.email}</p>
                <p><strong>URL da foto no Firebase:</strong> ${user?.photoURL}</p>
                <p><strong>Uid do usuário:</strong> ${user?.uid}</p>
                <br>
                <p style="font-weight: bold">Dados dos sensores ao gerar relatório</p>
                <p><strong>Temperatura:</strong> ${temp}ºC</p>
                <p><strong>Umidade:</strong> ${humid}%</p>
                <p><strong>Luminosidade:</strong> 80</p>
                <p><strong>Umidade:</strong> 6.6</p>
                <br>
                <footer>
                <p>Curitiba, ${formattedDate}</p>
                </footer>
            </body>
        </html>
    `

    async function generatePdf() {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });
        await shareAsync(file.uri);
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
                />

                <Button
                    title="Gerar relatório de usuário"
                    style={{ marginBottom: 60 }}
                    onPress={generatePdf}
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
