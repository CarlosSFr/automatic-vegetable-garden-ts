import styled from "styled-components/native";

export const Container = styled.TextInput`
    width: 100%;
    height: 46px;
    background-color: ${props => props.theme.colors.off_white};
    font-size: ${props => props.theme.font_size.MD}px;
    border-radius: 6px;
    padding: 0px 8px;
    margin-top: 14px;
`