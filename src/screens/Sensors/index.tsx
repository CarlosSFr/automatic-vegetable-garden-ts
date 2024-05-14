import bgImg from "./../../assets/bg-img-dark.png"
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";

export function Sensors() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <TextHeader
                title="Sensoriamento"
            />
        </ImageContainer>
    )
}