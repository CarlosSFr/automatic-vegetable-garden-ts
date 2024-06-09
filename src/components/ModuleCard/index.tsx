import { BookBookmark } from "phosphor-react-native";
import { ButtonText, ButtonsView, ModuleButton, ModuleContainer, ModuleText } from "./styles";

type Props = {
    title: string;
}

export function ModuleCard({ title }: Props) {
    return (
        <ModuleContainer>
            <ModuleText>
                {title}
            </ModuleText>
            <ButtonsView>
                <ModuleButton>
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