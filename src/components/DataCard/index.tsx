import { PlusSquare } from "phosphor-react-native";
import { AlignTextContainer, DataCardContainer, DataDescription, DataPic, DataTitle, LeftContainer } from "./styles";
import { ImageProps, ImageSourcePropType, TouchableOpacity } from "react-native";
import theme from "../../theme";

type Props = ImageProps & {
    adress: ImageKeys,
    title: string,
    description: string,
}

export type ImageKeys = "cherry-tomatoes.jpg" | "salsinha.jpg" | "morango.jpg" | "repolho.jpg" | "beterraba.jpg";

type ImagesObjectProps = {
    [key in ImageKeys]: ImageSourcePropType;
};

const imagesObject: ImagesObjectProps = {
    "cherry-tomatoes.jpg": require("./../../assets/data/cherry-tomatoes.jpg"),
    "salsinha.jpg": require("./../../assets/data/salsinha.jpg"),
    "morango.jpg": require("./../../assets/data/morango.jpg"),
    "repolho.jpg": require("./../../assets/data/repolho.jpg"),
    "beterraba.jpg": require("./../../assets/data/beterraba.jpg")
}

export function DataCard({ adress, title, description, ...rest }: Props) {

    return (
        <DataCardContainer>
            <LeftContainer>
                <DataPic
                    {...rest}
                    source={imagesObject[adress]}
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