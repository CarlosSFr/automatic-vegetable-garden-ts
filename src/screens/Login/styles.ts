import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 80px 30px 0px 30px;
`

export const ImageContainer = styled.ImageBackground`
    flex: 1;
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: 64px;
    font-weight: bold;
    width: 100%;
`

export const Subtitle = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: 42px;
    width: 100%;
`