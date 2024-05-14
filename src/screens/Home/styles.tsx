import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 50px 30px 500px 30px;
    gap: 120px;
`

export const LogoutContainer = styled.View`
    width: 100%;
`

export const Logout = styled.Text`
    color: ${props => props.theme.colors.red_dark};
    font-size: ${props => props.theme.font_size.LG}px;
    font-family: ${props => props.theme.font_family.bold};
    text-align: center;
    border: 1px solid ${props => props.theme.colors.red_dark};
    border-radius: 6px;
    padding: 10px;
`