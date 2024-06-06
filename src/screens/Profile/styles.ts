import styled from "styled-components/native";


export const Container = styled.View`
    padding: 30px;
    align-items: center;
`

export const ChangePhotoText = styled.Text`
    color: ${props => props.theme.colors.green_500};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.bold};
    margin: 12px 0px 34px 0px;
    width: 100%;
    text-align: center;
`

export const ContainerLeft = styled.View`
    padding: 30px;
    
`

export const ChangePass = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.bold};
`