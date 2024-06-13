import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";
import {plants} from "./../../../data.json";
import { FlatList } from "react-native";
import cherryTom from "./../../assets/data/cherry-tomatoes.jpg"

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
                                adress={`./../../assets/data/${item.photo}`}
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