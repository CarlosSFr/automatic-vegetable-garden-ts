import { BookBookmark } from "phosphor-react-native";
import { ButtonText, ButtonsView, ModuleButton, ModuleContainer, ModuleText } from "./styles";
import { FIREBASE_AUTH } from "../../../firebase";
import { useEffect, useState } from "react";

type Props = {
    title: string;
}

export function ModuleCard({ title }: Props) {
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        if (user && user.email !== "carlos@email.com") {
            setDisabled(true);
        }
    }, []);

    return (
        <ModuleContainer>
            <ModuleText>
                {title}
            </ModuleText>
            <ButtonsView>
                <ModuleButton
                    disabled={disabled}
                >
                    <ButtonText>
                        Configurar
                    </ButtonText>
                </ModuleButton>
                <ModuleButton>
                    <BookBookmark
                        size={20}
                        color="white"
                        weight="bold"
                    />
                    <ButtonText>
                        Acessar dados
                    </ButtonText>
                </ModuleButton>
            </ButtonsView>
        </ModuleContainer >
    )
}