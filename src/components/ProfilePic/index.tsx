import { ImageProps } from "react-native";
import { Container } from "./styles";

type Props = ImageProps & {
    size: number;
}

export function ProfilePic({size, ...rest}: Props){
    return (
        <Container 
            {...rest}
            style={{ width: size, height: size }}
        />
    )
}