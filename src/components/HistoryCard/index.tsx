import { HistoryCardContainer, LeftContainer, SubtitleText, TimeText, TitleText } from "./styles";

type HistoryCardProps = {
    module: string;
    name: string;
    time: string;
    humidity: number;
};

export function HistoryCard({ module, name, time, humidity }: HistoryCardProps) {
    return (
        <HistoryCardContainer>
            <LeftContainer>
                <TitleText>{name}</TitleText>
                <SubtitleText>Umidade: {humidity}%</SubtitleText>
            </LeftContainer>
            <TimeText>{time}</TimeText>
        </HistoryCardContainer>
    );
}
