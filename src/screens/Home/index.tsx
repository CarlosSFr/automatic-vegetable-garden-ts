import { ImageContainer } from "../Login/styles";
import { ButtonsContainer, Container, EachContainer, Logo, LogoContainer, Logout, LogoutContainer, TextContainer } from "./styles";
import bgImg from "./../../assets/bg-img-dark.png"
import logo from "./../../assets/logo.png"
import { Button } from "../../components/Button";

export function Home() {
    return (
        <ImageContainer
            source={bgImg}
        >
            <Container>
                <LogoContainer>
                    <Logo
                        source={logo}
                    />
                </LogoContainer>
                <ButtonsContainer>
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
                            Escolha um modelo pré-definido
                        </TextContainer>
                        <Button
                            title="Modelos"
                        />
                    </EachContainer>
                    <EachContainer>
                        <TextContainer>
                            Operação manual
                        </TextContainer>
                        <Button
                            title="Regar plantas"
                        />
                    </EachContainer>
                </ButtonsContainer>
                <LogoutContainer>
                    <Logout>
                        Logout
                    </Logout>
                </LogoutContainer>
            </Container>
        </ImageContainer>
    )
}