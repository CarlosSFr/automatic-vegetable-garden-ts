import styled from "styled-components/native";

export const Container = styled.View`
    padding: 20px 30px;
`

export const DataContainer = styled.View`
    padding: 14px 14px 0px 14px;
    background-color: ${props => props.theme.colors.gray_400};
    min-height: 88px;
    border-radius: 8px;
`