import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px 30px 30px 30px;
`

export const SectionHeader = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.regular};
    margin-bottom: 10px;
`

export const ListEmptyText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.XL}px;
    font-family: ${props => props.theme.font_family.regular};
    width: 100%;
    text-align: center;
`