import { ButtonTypeStyleProps, Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { BookBookmark, Play } from "phosphor-react-native"

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
}

export function Button({ title, type = "EMPTY", ...rest }: Props) {
    return (
        <Container
            {...rest}
            type={type}
        >
            {type === "EMPTY" ?
                <></>
                : type === "DATA" ?
                    < BookBookmark
                        size={24}
                        color="white"
                        weight="bold"
                    />
                    : <Play
                        size={24}
                        color="white"
                        weight="bold"
                    />
            }
            <Title>
                {title}
            </Title>
        </Container>
    )
}