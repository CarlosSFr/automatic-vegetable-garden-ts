import styled from "styled-components/native";


export const Container = styled.Image`
    border-radius: 100px;
    border: 2px solid ${props => props.theme.colors.gray_100};
    background-color: ${props => props.theme.colors.gray_100};
`