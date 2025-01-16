import { useState } from "react";
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

export function Modules() {
    const [isModalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const backgroundModal = theme.colors.gray_700;
    const { control, handleSubmit, formState: { errors } } = useForm({
    });

    function configurePlantation1() {
        setModalOpen(true); // Abre o modal
    }

    function closeModal() {
        setModalOpen(false); // Fecha o modal
    }

    function configurePlantation2() {
        console.log("Configurar Plantação 2");
    }

    function configurePlantation3() {
        console.log("Configurar Plantação 3");
    }

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
                        Configuração da Plantação 1
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
                    <Button title="Salvar configuração" onPress={closeModal} />
                </ModalContainer>
            </Modal>
        </ImageContainer>
    );
}
