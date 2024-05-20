import styled from "styled-components/native";


export const HistoryCardContainer = styled.View`
    background-color: ${props => props.theme.colors.gray_400};
    border-radius: 8px;
    flex-direction: row;
    padding: 16px 20px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`
export const TitleText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.LLG}px;
    font-family: ${props => props.theme.font_family.bold};
`

export const SubtitleText = styled.Text`
    color: ${props => props.theme.colors.gray_200};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.regular};
`

export const TimeText = styled.Text`
    color: ${props => props.theme.colors.gray_200};
    font-size: ${props => props.theme.font_size.SSM}px;
    font-family: ${props => props.theme.font_family.regular};
`

export const LeftContainer = styled.View`
    
`