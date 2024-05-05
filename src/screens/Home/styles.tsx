import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 50px 30px 500px 30px;
    gap: 120px;
`

export const LogoContainer = styled.View`
    width: 80px;
    height: 80px;
`

export const Logo = styled.ImageBackground`
    flex: 1;
`

export const TextContainer = styled.Text`
    font-size: ${props => props.theme.font_size.XL}px;
    color: ${props => props.theme.colors.white};
    /* font-family: ${props => props.theme.font_family.bold}; */;
    font-weight: bold;
    margin-bottom: 20px;
`

export const ButtonsContainer = styled.View`
    width: 100%;
`

export const EachContainer = styled.View`
    padding-bottom: 40px;
    width: 100%;
`

export const LogoutContainer = styled.View`
    width: 100%;
`

export const Logout = styled.Text`
    color: ${props => props.theme.colors.red_dark};
    font-size: ${props => props.theme.font_size.XL}px;
    font-family: ${props => props.theme.font_family.bold};
    text-align: center;
`