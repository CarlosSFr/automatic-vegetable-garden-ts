import { HistoryCardContainer, LeftContainer, SubtitleText, TimeText, TitleText } from "./styles";

type HistoryCardProps = {
    module: string;
    name: string;
    timestamp: string; // Agora recebe o timestamp bruto
    humidity: number;
};

export function HistoryCard({ name, timestamp, humidity }: HistoryCardProps) {
    const originalDate = new Date(timestamp);
    const adjustedDate = new Date(originalDate.getTime() + 3 * 60 * 60 * 1000); // Soma 3h em milissegundos

    const adjustedTime = adjustedDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
    });

    return (
        <HistoryCardContainer>
            <LeftContainer>
                <TitleText>{name}</TitleText>
                <SubtitleText>Umidade do solo: {humidity}%</SubtitleText>
            </LeftContainer>
            <TimeText>{adjustedTime}</TimeText>
        </HistoryCardContainer>
    );
}
