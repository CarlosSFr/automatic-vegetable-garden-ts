import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 60px 30px 0px 30px;
`

export const ButtonContainer = styled.View`
    align-items: center;
    width: 100%;
`

export const StyleContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`

export const SmallText = styled.Text`
    font-size: ${props => props.theme.font_size.SM}px;
    color: ${props => props.theme.colors.white};
    width: 10%;
    text-align: center;
`

export const SideLines = styled.View`
    width: 42%;
    height: 1px;
    background-color: white;
`

export const GoogleButton = styled.TouchableOpacity`
    width: 100%;
    height: 46px;
    background-color: ${props => props.theme.colors.gray_300};
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 24px;
`

export const GoogleButtonText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.LG}px;
    /* font-family: ${props => props.theme.font_family.bold}; */
    font-weight: bold;
`
