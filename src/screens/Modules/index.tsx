import { useEffect, useState } from "react";
import { ModuleCard } from "../../components/ModuleCard";
import { TextHeader } from "../../components/TextHeader";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { ModuleCardContainer, SaveImageButton, TitleAndCloseContainer } from "./styles";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { ModalContainer, ModalFormContainer, ModalFormTitles, ModalText } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { useModule } from "../../contexts/CyclesContext";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage, uploadImageToPlantData } from "../../firebase/firebase";
import { Alert, TouchableOpacity } from "react-native";
import { XSquare } from "phosphor-react-native";

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

interface PlantData {
    plantName: string;
    plantUmidity: string;
    plantTemperature: string;
    plantSoilTemp: string;
}

export function Modules() {
    const [isModalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const { setSelectedModule, selectedModule } = useModule();
    const [plantPhoto, setPlantPhoto] = useState("")
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            plantName: "",
            plantUmidity: "",
            plantTemperature: "",
            plantSoilTemp: "",
        }
    });

    async function updatePlantData(newPlant: any) {
        try {
            // Referência ao arquivo JSON no Firebase Storage
            const jsonRef = sRef(storage, "PlantData/data.json");

            // Baixa o arquivo JSON atual
            const jsonUrl = await getDownloadURL(jsonRef);
            const jsonResponse = await fetch(jsonUrl);
            const jsonData = await jsonResponse.json();

            // Adiciona o novo item à lista de plantas
            const updatedPlants = [...jsonData.plants, newPlant];

            // Atualiza o objeto JSON
            const updatedData = { plants: updatedPlants };

            // Converte para string e faz o upload
            const blob = new Blob([JSON.stringify(updatedData)], { type: "application/json" });
            await uploadBytes(jsonRef, blob);

            console.log("Novo dado adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar arquivo JSON:", error);
        }
    }

    function saveConfiguration(data: PlantData) {
        console.log("Dados salvos:", data);

        // Cria o objeto da nova planta
        const newPlant = {
            title: data.plantName,
            idealUmid: data.plantUmidity,
            idealTemp: data.plantTemperature,
            idealSoil: data.plantSoilTemp,
            photo: plantPhoto, // Usa a URL da imagem enviada
        };

        // Atualiza o arquivo JSON no Firebase Storage
        updatePlantData(newPlant);

        reset(); // Reseta os campos do formulário
        closeModal(); // Fecha o modal
    }


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

    useEffect(() => {
        //console.log("Selected module atualizado:", selectedModule);
    }, [selectedModule]);

    async function handlePhotoSelect() {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true,
        });

        if (photoSelected.canceled) {
            return;
        }

        if (photoSelected.assets[0].uri) {
            const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

            if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                return Alert.alert("Escolha uma imagem de até 5MB");
            }

            try {
                // Define o nome da imagem como o nome da planta em minúsculo e sem espaços
                const imageName = `${(selectedModule ?? "defaultModule").toLowerCase().replace(/\s+/g, "_")}_${new Date().getTime()}.jpg`;

                // Faz o upload da imagem para o Firebase Storage
                const photoUrl = await uploadImageToPlantData(photoSelected.assets[0].uri, imageName);

                setPlantPhoto(imageName);
                Alert.alert("Imagem enviada com sucesso!");
            } catch (error) {
                Alert.alert("Erro ao enviar a imagem", (error as Error).message);
            }
        }
    }

    return (
        <ImageContainer source={bgImg}>
            <TextHeader title="Configurar plantações" />
            <ModuleCardContainer>
                {["Plantação 1", "Plantação 2", "Plantação 3"].map((title, index) => (
                    <ModuleCard
                        key={index}
                        title={title}
                        onConfigure={() => {
                            if (index === 0) configurePlantation1();
                            if (index === 1) configurePlantation2();
                            if (index === 2) configurePlantation3();
                        }}
                    />
                ))}
            </ModuleCardContainer>

            <Modal
                isOpen={isModalOpen} // Controle de visibilidade
                onRequestClose={closeModal} // Fecha o modal ao pressionar fora ou ao usar o botão "voltar"
            >
                <ModalContainer>
                    <TitleAndCloseContainer>
                        <ModalText>
                            Configuração da {selectedModule === "moduleOne" ? "Plantação 1" : selectedModule === "moduleTwo" ? "Plantação 2" : "Plantação 3"}
                        </ModalText>
                        <TouchableOpacity
                            onPress={closeModal}
                        >
                            <XSquare
                                size={32}
                                color={theme.colors.red_dark}
                                weight="fill"
                            />
                        </TouchableOpacity>
                    </TitleAndCloseContainer>
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
                            Umidade ideal
                        </ModalFormTitles>
                        <Controller
                            control={control}
                            name="plantUmidity"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Umidade"
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ marginBottom: 12 }}
                                />
                            )}
                        />

                        <ModalFormTitles>
                            Temperatura ideal
                        </ModalFormTitles>
                        <Controller
                            control={control}
                            name="plantTemperature"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Temperatura"
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ marginBottom: 12 }}
                                />
                            )}
                        />

                        <ModalFormTitles>
                            Temperatura ideal do solo
                        </ModalFormTitles>
                        <Controller
                            control={control}
                            name="plantSoilTemp"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Temperatura solo"
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ marginBottom: 12 }}
                                />
                            )}
                        />

                        <TouchableOpacity>
                            <SaveImageButton
                                onPress={handlePhotoSelect}
                            >
                                Salvar imagem
                            </SaveImageButton>
                        </TouchableOpacity>
                    </ModalFormContainer>
                    <Button title="Salvar configuração" onPress={handleSubmit(saveConfiguration)} />
                </ModalContainer>
            </Modal>
        </ImageContainer>
    );
}
