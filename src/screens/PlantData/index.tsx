import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import { Container, DataContainer } from "./styles";
import { plants } from "./../../../data.json";

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
                    {/* <DataCard
                        title="Tomate Cereja"
                        description="12h"
                        adress={require("./../../assets/data/cherry-tomatoes.jpg")}
                    /> */}
                    {
                        plants.map((item) => (
                            <DataCard
                                key={item.id}
                                title={item.title}
                                description={item.irrigationTime}
                                adress={item.photo}
                            />
                        ))
                    }
                </DataContainer>
            </Container>
        </ImageContainer>
    )
}