import styled from "styled-components/native";


export const DataCardContainer = styled.View`
    background-color: ${props => props.theme.colors.gray_500};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.green_700};
    align-items: center;
    justify-content: space-between;
    padding: 14px 10px;
    flex-direction: row;
    margin-bottom: 14px;
`

export const DataTitle = styled.Text`
    color: ${props => props.theme.colors.off_white};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.bold};
`
export const DataDescription = styled.Text`
    color: ${props => props.theme.colors.gray_200};
    font-size: ${props => props.theme.font_size.SMM}px;
    font-family: ${props => props.theme.font_family.regular};
`
export const LeftContainer = styled.View`
    flex: 1;
    flex-direction: row;
    gap: 10px;
`
export const AlignTextContainer = styled.View`
    
`

export const DataPic = styled.Image`
    border-radius: 6px;
    height: 40px;
    width: 40px;
    border: 1px solid ${props => props.theme.colors.gray_200};
`