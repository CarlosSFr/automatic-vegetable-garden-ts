import { HistoryCardContainer, LeftContainer, SubtitleText, TimeText, TitleText } from "./styles";

export function HistoryCard() {
    return (
        <HistoryCardContainer>
            <LeftContainer>
                <TitleText>
                    Primeiro módulo
                </TitleText>
                <SubtitleText>
                    Tomate cereja
                </SubtitleText>
            </LeftContainer>
            <TimeText>
                08:52
            </TimeText>
        </HistoryCardContainer>
    )
}