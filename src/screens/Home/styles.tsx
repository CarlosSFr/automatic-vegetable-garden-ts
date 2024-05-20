import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 30px 30px 30px 30px;
    background-color: "green";
`
export const SensorBox = styled.View`
    width: 48%;
    height: 140px;
    padding: 12px 14px 0px 14px;
    background-color: ${props => props.theme.colors.gray_400};
    border-radius: 8px;
    margin: 1%;
`
export const SensorText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font_family.bold};
    font-size: ${props => props.theme.font_size.MD}px;
`
export const ValueBox = styled.View`
    flex-direction: row;
    flex: 1;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;
`
export const ValueText = styled.Text`
    color: ${props => props.theme.colors.green_700};
    font-family: ${props => props.theme.font_family.bold};
    font-size: ${props => props.theme.font_size.XLL}px;
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

