import { useEffect, useState } from "react";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import bgImg from "./../../assets/bg-img-dark.png";
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";
import { Container, ListEmptyText, SectionHeader } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { SectionList, ActivityIndicator } from "react-native";
import moment from "moment-timezone"; // Certifique-se de instalar: npm install moment-timezone

type HistoryEntry = {
    timestamp: string;
    humidity: number;
    action: string;
    module: string;
    name: string;
};

type SectionData = {
    title: string;
    data: HistoryEntry[];
};

export function History() {
    const [modules, setModules] = useState<SectionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchHistory = async () => {
        try {
            const historyRef = sRef(storage, "History/history.json");

            let url;
            try {
                url = await getDownloadURL(historyRef);
            } catch (error: any) {
                if (error.code === "storage/object-not-found") {
                    console.log("Arquivo history.json não encontrado.");
                    setModules([]);
                    return;
                }
                throw error;
            }

            const response = await fetch(url);
            const historyData: HistoryEntry[] = await response.json();

            if (!Array.isArray(historyData) || historyData.length === 0) {
                setModules([]);
                return;
            }

            const groupedData = historyData.reduce((acc, entry) => {
                const date = moment.utc(entry.timestamp).tz("America/Sao_Paulo").format("DD/MM/YYYY");
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(entry);
                return acc;
            }, {} as Record<string, HistoryEntry[]>);

            const sections = Object.entries(groupedData)
                .sort(([dateA], [dateB]) => {
                    const parsedDateA = moment(dateA, "DD/MM/YYYY").toDate();
                    const parsedDateB = moment(dateB, "DD/MM/YYYY").toDate();
                    return parsedDateB.getTime() - parsedDateA.getTime();
                })
                .map(([date, data]) => ({
                    title: date,
                    data,
                }));

            setModules(sections);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
        const interval = setInterval(fetchHistory, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ImageContainer source={bgImg}>
            <TextHeader title="Histórico" />
            <Container>
                {loading ? (
                    <ActivityIndicator size="large" color="#4CAF50" />
                ) : (
                    <SectionList
                        sections={modules}
                        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
                        renderItem={({ item }) => (
                            <HistoryCard
                                module={item.module}
                                name={item.name}
                                timestamp={item.timestamp} // Passando timestamp bruto
                                humidity={item.humidity}
                            />
                        )}
                        renderSectionHeader={({ section }) => (
                            <SectionHeader>{section.title}</SectionHeader>
                        )}
                        contentContainerStyle={modules.length === 0 && { flex: 1, justifyContent: "center" }}
                        ListEmptyComponent={() => (
                            <ListEmptyText>Não há histórico de irrigações.</ListEmptyText>
                        )}
                    />
                )}
            </Container>
        </ImageContainer>
    );
}
