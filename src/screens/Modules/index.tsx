import { useEffect, useState } from "react";
import { BackHeader } from "../../components/BackHeader";
import { ModuleCard } from "../../components/ModuleCard";
import { TextHeader } from "../../components/TextHeader";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { ModuleCardContainer } from "./styles";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { ModalContainer, ModalFormContainer, ModalFormTitles, ModalText } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { useModule } from "../../contexts/CyclesContext";

export function Modules() {
    const [isModalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const { setSelectedModule, selectedModule } = useModule();
    const backgroundModal = theme.colors.gray_700;
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            plantName: "",
            plantUmidity: "",
        }
    });

    function configurePlantation1() {
        setModalOpen(true); // Abre o modal
        setSelectedModule("moduleOne");
        //console.log("Selected module atualizado:", "moduleOne");
    }

    function closeModal() {
        //console.log("Modal fechado para o módulo:", selectedModule);
        setModalOpen(false);
    }

    function configurePlantation2() {
        setModalOpen(true); // Abre o modal
        setSelectedModule("moduleTwo");
        //console.log("Selected module atualizado:", "moduleTwo");
    }

    function configurePlantation3() {
        setModalOpen(true); // Abre o modal
        setSelectedModule("moduleThree");
        //console.log("Selected module atualizado:", "moduleThree");
    }

    function saveConfiguration(data: any) {
        console.log("Dados salvos:", data); // Aqui você pode lidar com os dados do formulário
        reset(); // Reseta os campos do formulário
        closeModal(); // Fecha o modal
    }

    useEffect(() => {
        //console.log("Selected module atualizado:", selectedModule);
    }, [selectedModule]);

    return (
        <ImageContainer source={bgImg}>
            <TextHeader title="Configurar plantações" />
            <ModuleCardContainer>
                <ModuleCard
                    title="Plantação 1"
                    onConfigure={configurePlantation1} // Função para abrir o modal
                />
                <ModuleCard
                    title="Plantação 2"
                    onConfigure={configurePlantation2}
                />
                <ModuleCard
                    title="Plantação 3"
                    onConfigure={configurePlantation3}
                />
            </ModuleCardContainer>

            <Modal
                isOpen={isModalOpen} // Controle de visibilidade
                onRequestClose={closeModal} // Fecha o modal ao pressionar fora ou ao usar o botão "voltar"
            >
                <ModalContainer>
                    <ModalText>
                        Configuração da {selectedModule === "moduleOne" ? "Plantação 1" : selectedModule === "moduleTwo" ? "Plantação 2" : "Plantação 3"}
                    </ModalText>
                    <ModalFormContainer>
                        <ModalFormTitles>
                            Nome da Planta
                        </ModalFormTitles>
                        <Controller
                            control={control}
                            name="plantName"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ marginBottom: 12 }}
                                />
                            )}
                        />

                        <ModalFormTitles>
                            Nível de umidade ideal
                        </ModalFormTitles>
                        <Controller
                            control={control}
                            name="plantUmidity"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nível"
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ marginBottom: 12 }}
                                />
                            )}
                        />


                    </ModalFormContainer>
                    <Button title="Salvar configuração" onPress={handleSubmit(saveConfiguration)} />
                </ModalContainer>
            </Modal>
        </ImageContainer>
    );
}
