import { PlusSquare } from "phosphor-react-native";
import { AlignTextContainer, DataCardContainer, DataDescription, DataPic, DataTitle, LeftContainer } from "./styles";
import { ImageProps, TouchableOpacity } from "react-native";
import theme from "../../theme";

type Props = ImageProps & {
    adress: string,
    title: string,
    description: string,
}

export function DataCard({ adress, title, description, ...rest }: Props) {
    return (
        <DataCardContainer>
            <LeftContainer>
                <DataPic
                    {...rest}
                    src={adress}
                />
                <AlignTextContainer>
                    <DataTitle>
                        {title}
                    </DataTitle>
                    <DataDescription>
                        Tempo de irrigação: {description}
                    </DataDescription>
                </AlignTextContainer>
            </LeftContainer>
            <TouchableOpacity>
                <PlusSquare
                    size={24}
                    color={theme.colors.gray_200}
                    weight="bold"
                />
            </TouchableOpacity>
        </DataCardContainer>
    )
}