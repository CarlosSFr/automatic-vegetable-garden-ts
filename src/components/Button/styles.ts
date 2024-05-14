import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled(TouchableOpacity)`
    width: 100%;
    height: 46px;
    background-color: ${props => props.theme.colors.green_700};
    border-radius: 6px;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: ${props => props.theme.font_size.LG}px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`