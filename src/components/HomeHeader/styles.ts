import styled from "styled-components/native";


export const Container = styled.View`
    flex-direction: row;
    padding: 22px 0 22px 30px;
    background-color: ${props => props.theme.colors.gray_700};
    align-items: center;
`

export const TextContainer = styled.View`
    flex-direction: column;
`

export const HelloText = styled.Text`
    color: ${props => props.theme.colors.gray_100};
    font-size: ${props => props.theme.font_size.MD};
`

export const UserName = styled.Text`
    color: ${props => props.theme.colors.gray_100};
    font-size: ${props => props.theme.font_size.MD};
    font-weight: bold;
`