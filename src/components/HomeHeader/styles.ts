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

export const TextContainer = styled.View`
    flex-direction: column;
    margin-left: 12px;
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