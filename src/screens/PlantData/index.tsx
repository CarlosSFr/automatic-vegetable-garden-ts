import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";

import { storage } from "../../../firebase";
import { getDownloadURL, ref as sRef } from "firebase/storage";

export function PlantData() {
    const [plants, setPlants] = useState<any[]>([]);

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
                            // Tenta obter a URL da imagem
                            const imageRef = sRef(storage, `PlantData/${plant.photo}`);
                            const imageUrl = await getDownloadURL(imageRef);

                            // Retorna a planta apenas se a imagem for encontrada
                            return {
                                ...plant,
                                imageUrl,
                            };
                        } catch (error) {
                            //console.warn(`Imagem não encontrada para: ${plant.photo}`);
                            return null; // Planta descartada se a imagem não existir
                        }
                    })
                );

                // Filtra plantas válidas (aquelas que possuem URL da imagem)
                setPlants(plantsWithImages.filter((plant) => plant !== null));
            } catch (error) {
                console.error("Erro ao acessar dados ou imagens:", error);
            }
        };

        fetchData();
    }, []);

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
                                adress={item.imageUrl} // Usa a URL válida da imagem
                                title={item.title}
                                umidadeIdeal={item.idealUmid}
                                temperaturaIdeal={item.idealTemp}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </DataContainer>
            </Container>
        </ImageContainer>
    );
}
