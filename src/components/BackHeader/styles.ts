import styled from "styled-components/native";
// import { SafeAreaView } from "react-native-safe-area-context";


// export const Container = styled(SafeAreaView)`
export const Container = styled.View`
    flex-direction: row;
    padding: 37px 30px 22px 30px;
    background-color: ${props => props.theme.colors.gray_700};
    align-items: center;
    justify-content: space-between;
`

export const TextContainer = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.XL}px;
    font-weight: bold;
    flex: 1;
    text-align: center;
`