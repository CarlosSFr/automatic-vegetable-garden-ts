import React from "react";
import { ButtonTypeStyleProps, Container, Title } from "./styles";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { BookBookmark, Play } from "phosphor-react-native"

type Props = TouchableOpacityProps & {
    title?: string;
    type?: ButtonTypeStyleProps;
    loading?: boolean;
}

export function Button({ title, type = "EMPTY", loading = false, ...rest }: Props) {
    return (
        <Container
            {...rest}
            type={type}
            disabled={loading} // Disable the button when loading
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <>
                    {type === "EMPTY" ? (
                        <></>
                    ) : type === "DATA" ? (
                        <BookBookmark
                            size={24}
                            color="white"
                            weight="bold"
                        />
                    ) : (
                        <Play
                            size={24}
                            color="white"
                            weight="bold"
                        />
                    )}
                    <Title>
                        {title}
                    </Title>
                </>
            )}
        </Container>
    );
}