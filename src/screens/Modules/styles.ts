import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get('window').height;

export const ModuleCardContainer = styled.View`
    padding: 50px 30px;
    align-items: center;
    flex: 1;
`

export const ModalContainer = styled.View`
    padding: 20px 16px; 
    background-color: ${({ theme }) => theme.colors.gray_700};
    border-radius: 8px; 
    flex-shrink: 1;
    /* min-height: 43%;
    max-height: 60%; */
    max-height: ${screenHeight * 0.6}px; /* 80% da altura da tela */
    min-height: ${screenHeight * 0.44}px; /* 20% da altura da tela */
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