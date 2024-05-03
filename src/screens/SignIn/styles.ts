import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 60px 30px 0px 30px;
`

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 42px;
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