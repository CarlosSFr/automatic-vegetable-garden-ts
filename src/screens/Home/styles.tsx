import styled from "styled-components/native";

export const ImageContainer = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
`

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 0px 30px 0px 30px;
    background-color: "green";
`

export const SensorsTest = styled.View`
    flex: 1;
`

export const SensorBox = styled.View`
    width: 48%;
    height: 140px;
    padding: 12px 14px 18px 14px;
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
    /* padding-bottom: 10px; */
    justify-content: center;
    align-items: center;
    gap: 5px;
`
export const ValueText = styled.Text`
    color: ${props => props.theme.colors.green_700};
    font-family: ${props => props.theme.font_family.bold};
    font-size: ${props => props.theme.font_size.XLL}px;
`

export const ListTitleBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 4px;
    margin-bottom: 16px;
    margin-top: 16px;
`

export const ListLeftContainer = styled.View`
    flex: 1;
`

export const LightContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

export const SensorsDataContainer = styled.View`
    flex-direction: row;
    margin-top: 16px;
    flex: 1;
    padding: 0px 30px 0px 30px;
    align-items: center;
    justify-content: space-between;
`

export const GeneralDataContainer = styled.View`
    flex: 1;

`

export const PlantText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font_family.bold};
    font-size: ${props => props.theme.font_size.LLG}px;
`

export const SunLightText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font_family.bold};
    font-size: ${props => props.theme.font_size.LG}px;
`

export const IdealText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font_family.regular};
    font-size: ${props => props.theme.font_size.SMM}px;
`;


