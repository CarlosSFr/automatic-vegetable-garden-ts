import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 60% 30px 0px 30px;
`

export const ImageContainer = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    position: absolute;
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.XXXL}px;
    font-weight: bold;
    width: 100%;
`

export const Subtitle = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.XLL}px;
    width: 100%;
    flex-wrap: nowrap;
`

export const ForgotPass = styled.Text`
    font-size: ${props => props.theme.font_size.SM}px;
    color: ${props => props.theme.colors.white};
    width: 100%;
    padding: 10px;
    text-align: right;
`

export const Register = styled.Text`
    font-size: ${props => props.theme.font_size.SM}px;
    color: ${props => props.theme.colors.white};
    width: 100%;
    padding-top: 10px;
`