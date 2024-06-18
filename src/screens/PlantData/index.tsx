import { BackHeader } from "../../components/BackHeader";
import { DataCard, ImageKeys } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";
import { plants } from "./../../../data.json";
import { FlatList } from "react-native";

export function PlantData() {

    return (
        <ImageContainer
            source={bgImg}
        >
            <BackHeader
                title="Dados"
            />
            <Container>
                <DataContainer>
                    <FlatList
                        data={plants}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DataCard
                                adress={item.photo as ImageKeys}
                                title={item.title}
                                description={item.irrigationTime}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </DataContainer>
            </Container>
        </ImageContainer>
    )
}