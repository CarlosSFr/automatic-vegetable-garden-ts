import { useEffect, useState } from "react";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import bgImg from "./../../assets/bg-img-dark.png";
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";
import { Container, ListEmptyText, SectionHeader } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { SectionList, ActivityIndicator } from "react-native";

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

    // Função para buscar e processar o histórico
    const fetchHistory = async () => {
        try {
            const historyRef = sRef(storage, "History/history.json");
            const url = await getDownloadURL(historyRef);
            const response = await fetch(url);
            const historyData: HistoryEntry[] = await response.json();

            const groupedData = historyData.reduce((acc, entry) => {
                const date = new Date(entry.timestamp).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(entry);
                return acc;
            }, {} as Record<string, HistoryEntry[]>);

            // Ordena as seções em ordem decrescente de data
            const sections = Object.entries(groupedData)
                .sort(([dateA], [dateB]) => {
                    const parsedDateA = new Date(dateA.split('/').reverse().join('-'));
                    const parsedDateB = new Date(dateB.split('/').reverse().join('-'));
                    return parsedDateB.getTime() - parsedDateA.getTime(); // Decrescente
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
        // Primeira chamada para buscar o histórico
        fetchHistory();

        // Configurar intervalo para buscar atualizações a cada 10 segundos
        const interval = setInterval(fetchHistory, 10000); // 10 segundos

        // Limpar o intervalo quando o componente for desmontado
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
                                time={new Date(item.timestamp).toLocaleTimeString("pt-BR", {
                                    timeZone: "America/Sao_Paulo",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                humidity={item.humidity}
                            />
                        )}
                        renderSectionHeader={({ section }) => (
                            <SectionHeader>{section.title}</SectionHeader>
                        )}
                        contentContainerStyle={modules.length === 0 && { flex: 1, justifyContent: "center" }}
                        ListEmptyComponent={() => (
                            <ListEmptyText>
                                Não há histórico de irrigações.
                            </ListEmptyText>
                        )}
                    />
                )}
            </Container>
        </ImageContainer>
    );
}
