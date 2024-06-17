import { TouchableOpacity } from "react-native";
import styled, {css} from "styled-components/native";

export type ButtonTypeStyleProps = "true" | "false";

type Props = {
    type?: ButtonTypeStyleProps;
}

export const ModuleContainer = styled.View`
    min-height: 100px;
    background-color: ${props => props.theme.colors.gray_400};
    border-radius: 8px;
    width: 100%;
    padding: 14px;
    margin-bottom: 30px;
`

export const ModuleText = styled.Text`
    color: ${props => props.theme.colors.off_white};
    font-size: ${props => props.theme.font_size.LLG}px;
    font-family: ${props => props.theme.font_family.bold};
    margin-bottom: 25px;
`

export const ButtonsView = styled.View`
    flex-direction: row;
    gap: 14px;
`

export const ModuleButton = styled(TouchableOpacity)<Props>`
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 48%;
    padding: 8px;
    gap: 4px;
    background-color: ${({theme, type}) => type === "true" ?
    theme.colors.green_700
    :
    theme.colors.gray_600      
}

    
`
export const ButtonText = styled.Text`
    font-size: ${props => props.theme.font_size.SSM}px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`