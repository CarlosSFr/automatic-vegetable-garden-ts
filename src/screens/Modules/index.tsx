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
                    title="Módulo 1"
                />
                <ModuleCard
                    title="Módulo 2"
                />
                <ModuleCard
                    title="Módulo 3"
                />
            </ModuleCardContainer>
        </ImageContainer>
    )
}