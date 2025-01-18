import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard"; // Importa o DataCard otimizado
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";

import { useModule } from "../../contexts/CyclesContext";

import { storage } from "../../../firebase";
import { db, ref as dbRef } from "../../../firebase";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { update } from "firebase/database";

export function PlantData() {
    const [plants, setPlants] = useState<any[]>([]);
    const { selectedModule } = useModule();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Referência ao arquivo JSON no Firebase Storage
                const jsonRef = sRef(storage, "PlantData/data.json");
                const jsonUrl = await getDownloadURL(jsonRef);
                const jsonResponse = await fetch(jsonUrl);
                const jsonData = await jsonResponse.json();

                // Mapeia as plantas e tenta buscar as URLs das imagens
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
                            return null;
                        }
                    })
                );

                // Filtra plantas válidas
                setPlants(plantsWithImages.filter((plant) => plant !== null));
            } catch (error) {
                console.error("Erro ao acessar dados ou imagens:", error);
            }
        };

        fetchData();
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
        [selectedModule] // Depende apenas do módulo selecionado
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
                                onAdd={() => handleAddPlant(item)} // Passa função estável
                            />
                        )}
                        initialNumToRender={10} // Renderiza 10 itens inicialmente
                        maxToRenderPerBatch={5} // Renderiza 5 itens por lote
                        updateCellsBatchingPeriod={50} // Atualiza itens a cada 50ms
                        windowSize={21} // Define o tamanho da janela de renderização
                        showsVerticalScrollIndicator={false}
                    />
                </DataContainer>
            </Container>
        </ImageContainer>
    );
}
