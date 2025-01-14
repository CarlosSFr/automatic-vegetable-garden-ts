import styled from "styled-components/native";

export const ModuleCardContainer = styled.View`
    padding: 50px 30px;
    align-items: center;
    flex: 1;
`

export const ModalContainer = styled.View`
    padding: 20px 16px; 
    background-color: ${({ theme }) => theme.colors.gray_700};
    border-radius: 8px; 
    height: 55%; 
    width: 90%;
`;

export const ModalFormContainer = styled.View`
    flex: 1;
    padding: 20px 0px;
    justify-content: flex-start;
    align-items: left;
    width: 100%;
`;

export const ModalFormTitles = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font_size.MD}px;
    font-family: ${({ theme }) => theme.font_family.bold};

`;

export const ModalText = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font_size.LLG}px;
    font-family: ${({ theme }) => theme.font_family.bold};
`;