import { BookBookmark } from "phosphor-react-native";
import { ButtonText, ButtonTypeStyleProps, ButtonsView, ModuleButton, ModuleContainer, ModuleText } from "./styles";
import { FIREBASE_AUTH } from "../../../firebase";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";

type Props = {
    title: string;
}

export function ModuleCard({ title }: Props) {
    const [disabled, setDisabled] = useState(false)
    const navigation = useNavigation<AppNavigationRoutesProps>()

    function handleUserPermission() {
        navigation.navigate("plantData")
    }

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        if (user && user.email !== "carlos@email.com") {
            setDisabled(true);
            Toast.show({
                type: "error",
                text1: "Banco de dados bloqueado.",
                text2: "Função para usuário premium!",
                visibilityTime: 2000,
                position: "bottom"
            });
        }
    }, []);

    return (
        <ModuleContainer>
            <ModuleText>
                {title}
            </ModuleText>
            <ButtonsView>
                <ModuleButton
                    type="true"
                >
                    <ButtonText>
                        Configurar
                    </ButtonText>
                </ModuleButton>
                <ModuleButton
                    type={disabled ? "false" : "true"}
                    disabled={disabled}
                    onPress={handleUserPermission}
                >
                    <BookBookmark
                        size={20}
                        color="white"
                        weight="bold"
                    />
                    <ButtonText>
                        Cadastrar
                    </ButtonText>
                </ModuleButton>
            </ButtonsView>
        </ModuleContainer >
    )
}