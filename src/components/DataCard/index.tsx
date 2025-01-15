import { AlignTextContainer, DataCardContainer, DataDescription, DataPic, DataTitle, LeftContainer } from "./styles";
import { TouchableOpacity, Image } from "react-native";
import { PlusSquare } from "phosphor-react-native";
import theme from "../../theme";

type Props = {
    adress: string; // URL da imagem agora como string
    title: string;
    umidadeIdeal: string;
    temperaturaIdeal: string;
};

export function DataCard({ adress, title, umidadeIdeal, temperaturaIdeal }: Props) {
    return (
        <DataCardContainer>
            <LeftContainer>
                {/* Exibe a imagem diretamente da URL */}
                <DataPic
                    source={{ uri: adress }}
                />
                <AlignTextContainer>
                    <DataTitle>{title}</DataTitle>
                    <DataDescription>Umidade Ideal: {umidadeIdeal}</DataDescription>
                    <DataDescription>Temperatura Ideal: {temperaturaIdeal}</DataDescription>
                </AlignTextContainer>
            </LeftContainer>
            <TouchableOpacity>
                <PlusSquare size={24} color={theme.colors.gray_200} weight="bold" />
            </TouchableOpacity>
        </DataCardContainer>
    );
}
