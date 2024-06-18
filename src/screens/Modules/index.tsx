import { BackHeader } from "../../components/BackHeader";
import { ModuleCard } from "../../components/ModuleCard";
import { ImageContainer } from "../SignIn/styles";
import bgImg from "./../../assets/bg-img-dark.png"
import { ModuleCardContainer } from "./styles";

export function Modules() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <BackHeader
                title="Módulos"
            />
            <ModuleCardContainer>
                <ModuleCard
                    title="Plantação 1"
                />
                <ModuleCard
                    title="Plantação 2"
                />
                <ModuleCard
                    title="Plantação 3"
                />
            </ModuleCardContainer>
        </ImageContainer>
    )
}