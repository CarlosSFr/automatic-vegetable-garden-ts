import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";

import { useModule } from "../../contexts/CyclesContext";

import { storage, db } from "../../firebase/firebase";
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { ref as dbRef, onValue, update } from "firebase/database";

export function PlantData() {
    const [plants, setPlants] = useState<any[]>([]);
    const { selectedModule } = useModule();

    useEffect(() => {
        // Função para buscar e ouvir dados em tempo real
        const fetchAndListen = async () => {
            try {
                // Referência ao JSON no Storage
                const jsonRef = sRef(storage, "PlantData/data.json");
                const jsonUrl = await getDownloadURL(jsonRef);
                const jsonResponse = await fetch(jsonUrl);
                const jsonData = await jsonResponse.json();

                // Listener para ouvir atualizações no Realtime Database
                const plantsRef = dbRef(db, "PlantData");
                onValue(plantsRef, async (snapshot) => {
                    const realtimeData = snapshot.val();

                    // Combinar dados do JSON com os URLs das imagens
                    const plantsWithImages = await Promise.all(
                        jsonData.plants.map(async (plant: any) => {
                            try {
                                const imageRef = sRef(storage, `PlantData/${plant.photo}`);
                                const imageUrl = await getDownloadURL(imageRef);

                                return {
                                    ...plant,
                                    imageUrl,
                                };
                            } catch {
                                return null; // Ignorar plantas sem imagem
                            }
                        })
                    );

                    setPlants(plantsWithImages.filter((plant) => plant !== null));
                });
            } catch (error) {
                console.error("Erro ao acessar dados ou imagens:", error);
            }
        };

        fetchAndListen();

        return () => {
            // Adicione lógica para remover listeners caso necessário
        };
    }, []);

    // Função para adicionar planta ao módulo
    const handleAddPlant = useCallback(
        (plant: any) => {
            if (!selectedModule) {
                console.warn("Nenhum módulo selecionado.");
                return;
            }

            const plantRef = dbRef(db, `${selectedModule}/details`);

            const plantDetails = {
                title: plant.title,
                idealUmid: plant.idealUmid,
                idealTemp: plant.idealTemp,
                idealSoil: plant.idealSoil,
            };

            update(plantRef, plantDetails)
                .then(() => console.log("Planta cadastrada com sucesso:", JSON.stringify(plantDetails)))
                .catch((error) => console.error("Erro ao cadastrar planta:", error));
        },
        [selectedModule]
    );

    return (
        <ImageContainer source={bgImg}>
            <BackHeader title="Dados" />
            <Container>
                <DataContainer>
                    <FlatList
                        data={plants}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => (
                            <DataCard
                                adress={item.imageUrl}
                                title={item.title}
                                umidadeIdeal={item.idealUmid}
                                temperaturaIdeal={item.idealTemp}
                                onAdd={() => handleAddPlant(item)}
                            />
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={5}
                        updateCellsBatchingPeriod={50}
                        windowSize={21}
                        showsVerticalScrollIndicator={false}
                    />
                </DataContainer>
            </Container>
        </ImageContainer>
    );
}
