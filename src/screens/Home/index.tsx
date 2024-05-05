import { ImageContainer } from "../Login/styles";
import { Container, EachContainer, Logo, LogoContainer, TextContainer } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png"
import logo from "./../../assets/logo.png"
import { Button } from "../../components/Button";

export function Home() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <LogoContainer>
                <Logo
                    source={logo}
                />
            </LogoContainer>
            <Container>
                <EachContainer>
                    <TextContainer>
                        Deseja monitorar sua horta?
                    </TextContainer>
                    <Button
                        title="Sensores"
                    />
                </EachContainer>
                <EachContainer>
                    <TextContainer>
                        Deseja monitorar sua horta?
                    </TextContainer>
                    <Button
                        title="Sensores"
                    />
                </EachContainer>
                <EachContainer>
                    <TextContainer>
                        Deseja monitorar sua horta?
                    </TextContainer>
                    <Button
                        title="Sensores"
                    />
                </EachContainer>
            </Container>
        </ImageContainer>
    )
}