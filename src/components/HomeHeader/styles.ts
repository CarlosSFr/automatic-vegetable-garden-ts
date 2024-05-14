import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";


export const Container = styled(SafeAreaView)`
    flex-direction: row;
    padding: 25px 30px 22px 30px;
    background-color: ${props => props.theme.colors.gray_700};
    align-items: center;
    justify-content: space-between;
`

export const TextContainer = styled.View`
    flex-direction: column;
`

export const HelloText = styled.Text`
    color: ${props => props.theme.colors.gray_100};
    font-size: ${props => props.theme.font_size.MD}px;
`

export const UserName = styled.Text`
    color: ${props => props.theme.colors.gray_100};
    font-size: ${props => props.theme.font_size.MD}px;
    font-weight: bold;
`

export const LogoContainer = styled.Image`
    height: 60px;
    width: 60px;
    object-fit: contain;
`