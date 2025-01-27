import { BookBookmark } from "phosphor-react-native";
import { ButtonText, ButtonTypeStyleProps, ButtonsView, ModuleButton, ModuleContainer, ModuleText } from "./styles";
import { FIREBASE_AUTH } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "../../routes/app.routes";
import { useModule } from "../../contexts/CyclesContext";

type Props = {
    title: string;
    onConfigure: () => void; // Função para o botão Configurar
};

export function ModuleCard({ title, onConfigure }: Props) {
    const [disabled, setDisabled] = useState(false);
    const { setSelectedModule } = useModule();
    const navigation = useNavigation<AppNavigationRoutesProps>();

    function handleUserPermission() {
        setSelectedModule(title === "Plantação 1" ? "moduleOne" : title === "Plantação 2" ? "moduleTwo" : "moduleThree");
        navigation.navigate("plantData");
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
                position: "bottom",
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
                    onPress={onConfigure} // Função para o botão Configurar
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
        </ModuleContainer>
    );
}
