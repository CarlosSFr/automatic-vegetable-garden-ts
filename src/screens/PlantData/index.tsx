import { BackHeader } from "../../components/BackHeader";
import { DataCard } from "../../components/DataCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png";
import cherryTomatoes from "./../../assets/data/cherry-tomatoes.jpg";
import { Container, DataContainer } from "./styles";

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
                    <DataCard
                        title="Tomate Cereja"
                        description="12h"
                        adress={cherryTomatoes}
                    />
                </DataContainer>
            </Container>
        </ImageContainer>
    )
}