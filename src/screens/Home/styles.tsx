import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
    flex: 1;
    align-items: center;
    padding: 30px 30px 30px 30px;
    gap: 120px;
`

export const LogoutContainer = styled.View`
    width: 100%;
`

export const Logout = styled.Text`
    color: ${props => props.theme.colors.red_dark};
    font-size: ${props => props.theme.font_size.LLG}px;
    font-family: ${props => props.theme.font_family.bold};
    text-align: center;
    border: 1px solid ${props => props.theme.colors.red_dark};
    border-radius: 6px;
    padding: 13px;
`

export const SensorContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`

export const SensorBox = styled.View`
    width: 170px;
    height: 140px;
    padding: 12px 14px 0px 14px;
    background-color: ${props => props.theme.colors.gray_400};
    border-radius: 8px;
`