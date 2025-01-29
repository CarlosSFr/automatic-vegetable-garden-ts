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
import { Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { XSquare } from "phosphor-react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

interface PlantData {
    plantName: string;
    plantUmidity: string;
    plantTemperature: string;
    plantSoilTemp: string;
}

export function Modules() {
    const [isModalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const { setNeedsUpdate } = useModule(); // Usar o contexto
    const [loadingImage, setLoadingImage] = useState(false);
    const [savingConfig, setSavingConfig] = useState(false); // New state for button disabling
    const { setSelectedModule, selectedModule } = useModule();
    const [plantPhoto, setPlantPhoto] = useState("");
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
            const jsonRef = sRef(storage, "PlantData/data.json");
            const jsonUrl = await getDownloadURL(jsonRef);
            const jsonResponse = await fetch(jsonUrl);
            const jsonData = await jsonResponse.json();

            const updatedPlants = [...jsonData.plants, newPlant];
            const updatedData = { plants: updatedPlants };

            const blob = new Blob([JSON.stringify(updatedData)], { type: "application/json" });
            await uploadBytes(jsonRef, blob);

            console.log("Novo dado adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar arquivo JSON:", error);
        }
    }

    async function saveConfiguration(data: PlantData) {
        if (!plantPhoto) {
            Alert.alert("Atenção", "Por favor, selecione uma imagem antes de salvar.");
            return;
        }

        const newPlant = {
            title: data.plantName,
            idealUmid: data.plantUmidity,
            idealTemp: data.plantTemperature,
            idealSoil: data.plantSoilTemp,
            photo: plantPhoto,
        };

        setSavingConfig(true); // Disable button

        try {
            await updatePlantData(newPlant);
            console.log("Planta salva com sucesso no JSON!");
            reset();
            closeModal();
            setNeedsUpdate(true);
        } catch (error) {
            console.error("Erro ao salvar planta:", error);
            Alert.alert("Erro", "Não foi possível salvar os dados. Tente novamente.");
        } finally {
            setSavingConfig(false); // Re-enable button
        }
    }

    function configurePlantation1() {
        setModalOpen(true);
        setSelectedModule("moduleOne");
    }

    function closeModal() {
        setModalOpen(false);
    }

    function configurePlantation2() {
        setModalOpen(true);
        setSelectedModule("moduleTwo");
    }

    function configurePlantation3() {
        setModalOpen(true);
        setSelectedModule("moduleThree");
    }

    useEffect(() => { }, [selectedModule]);

    async function handlePhotoSelect() {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
                aspect: [4, 4],
            });

            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets && photoSelected.assets[0].uri) {
                setLoadingImage(true);

                const photoUri = photoSelected.assets[0].uri;
                const fileName = `${(selectedModule ?? "defaultModule").toLowerCase().replace(/\s+/g, "_")}_${new Date().getTime()}.jpg`;

                const photoUrl = await uploadImageToPlantData(photoUri, fileName);

                setPlantPhoto(fileName);
                Toast.show({
                    type: "success",
                    text1: "Sucesso!",
                    text2: "Imagem enviada com sucesso!",
                    visibilityTime: 1500,
                    position: "top"
                });
            }
        } catch (error) {
            Alert.alert("Erro ao enviar a imagem", (error as Error).message);
        } finally {
            setLoadingImage(false);
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
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <ModalContainer>
                    <TitleAndCloseContainer>
                        <ModalText>
                            Configuração da {selectedModule === "moduleOne" ? "Plantação 1" : selectedModule === "moduleTwo" ? "Plantação 2" : "Plantação 3"}
                        </ModalText>
                        <TouchableOpacity onPress={closeModal}>
                            <XSquare size={32} color={theme.colors.red_dark} weight="fill" />
                        </TouchableOpacity>
                    </TitleAndCloseContainer>
                    <ModalFormContainer>
                        <ModalFormTitles>Nome da Planta</ModalFormTitles>
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

                        <ModalFormTitles>Umidade ideal</ModalFormTitles>
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

                        <ModalFormTitles>Temperatura ideal</ModalFormTitles>
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

                        <ModalFormTitles>Temperatura ideal do solo</ModalFormTitles>
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
                            <SaveImageButton onPress={handlePhotoSelect}>
                                Salvar imagem
                            </SaveImageButton>
                        </TouchableOpacity>
                    </ModalFormContainer>
                    <Button
                        title="Salvar configuração"
                        onPress={handleSubmit(saveConfiguration)}
                        disabled={savingConfig || loadingImage || !plantPhoto} // Botão desativado enquanto carrega ou salva
                        loading={savingConfig || loadingImage} // Exibe indicador de carregamento
                    />
                </ModalContainer>
            </Modal>
        </ImageContainer>
    );
}
