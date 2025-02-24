import React from "react";
import { AlignTextContainer, DataCardContainer, DataDescription, DataPic, DataTitle, LeftContainer } from "./styles";
import { TouchableOpacity } from "react-native";
import { PlusSquare } from "phosphor-react-native";
import theme from "../../theme";

type Props = {
    adress: string; // URL da imagem agora como string
    title: string;
    umidadeIdeal: string;
    temperaturaIdeal: string;
    onAdd: () => void; // Função chamada ao clicar no botão
};

const DataCardComponent = ({ adress, title, umidadeIdeal, temperaturaIdeal, onAdd }: Props) => {
    return (
        <DataCardContainer>
            <LeftContainer>
                {/* Exibe a imagem diretamente da URL */}
                <DataPic source={{ uri: adress }} />
                <AlignTextContainer>
                    <DataTitle>{title}</DataTitle>
                    <DataDescription>Umidade Ideal: {umidadeIdeal}</DataDescription>
                    <DataDescription>Temperatura Ideal: {temperaturaIdeal}</DataDescription>
                </AlignTextContainer>
            </LeftContainer>
            <TouchableOpacity onPress={onAdd}>
                <PlusSquare size={24} color={theme.colors.gray_200} weight="bold" />
            </TouchableOpacity>
        </DataCardContainer>
    );
};

// Envolve o componente com React.memo para evitar renderizações desnecessárias
export const DataCard = React.memo(DataCardComponent);
