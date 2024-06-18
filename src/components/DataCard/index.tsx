import { PlusSquare } from "phosphor-react-native";
import { AlignTextContainer, DataCardContainer, DataDescription, DataPic, DataTitle, LeftContainer } from "./styles";
import { ImageProps, ImageSourcePropType, TouchableOpacity } from "react-native";
import theme from "../../theme";

type Props = ImageProps & {
    adress: ImageKeys,
    title: string,
    description: string,
}

export type ImageKeys =
    | "cherry-tomatoes.jpg"
    | "salsinha.jpg"
    | "morango.jpg"
    | "repolho.jpg"
    | "beterraba.jpg"
    | "alface.jpg"
    | "cenoura.jpg"
    | "rucula.jpg"
    | "cebolinha.jpg"
    | "manjericao.jpg"
    | "coentro.jpg"
    | "pimentao.jpg"
    | "rabanete.jpg"
    | "espinafre.jpg"
    | "pepino.jpg";

type ImagesObjectProps = {
    [key in ImageKeys]: ImageSourcePropType;
};

const imagesObject: ImagesObjectProps = {
    "cherry-tomatoes.jpg": require("./../../assets/data/cherry-tomatoes.jpg"),
    "salsinha.jpg": require("./../../assets/data/salsinha.jpg"),
    "morango.jpg": require("./../../assets/data/morango.jpg"),
    "repolho.jpg": require("./../../assets/data/repolho.jpg"),
    "beterraba.jpg": require("./../../assets/data/beterraba.jpg"),
    "alface.jpg": require("./../../assets/data/alface.jpg"),
    "cenoura.jpg": require("./../../assets/data/cenoura.jpg"),
    "rucula.jpg": require("./../../assets/data/rucula.jpg"),
    "cebolinha.jpg": require("./../../assets/data/cebolinha.jpg"),
    "manjericao.jpg": require("./../../assets/data/manjericao.jpg"),
    "coentro.jpg": require("./../../assets/data/coentro.jpg"),
    "pimentao.jpg": require("./../../assets/data/pimentao.jpg"),
    "rabanete.jpg": require("./../../assets/data/rabanete.jpg"),
    "espinafre.jpg": require("./../../assets/data/espinafre.jpg"),
    "pepino.jpg": require("./../../assets/data/pepino.jpg")
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