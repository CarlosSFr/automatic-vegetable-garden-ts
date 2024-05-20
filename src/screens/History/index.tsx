import bgImg from "./../../assets/bg-img-dark.png"
import { ImageContainer } from "../SignIn/styles";
import { TextHeader } from "../../components/TextHeader";
import { Container, ListEmptyText, SectionHeader } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { SectionList } from "react-native";
import { useState } from "react";

export function History() {
    const [modules, setModules] = useState([
        {
            title: "19/05/2024",
            data: ["Tomate cereja", "Morango", "Salsinha"],
        },
        {
            title: "18/05/2024",
            data: ["Morango"],
        }
    ])

    return (
        <ImageContainer
            source={bgImg}
        >
            <TextHeader
                title="Histórico"
            />
            <Container>
                <SectionList
                    sections={modules}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <HistoryCard />
                    )}
                    renderSectionHeader={({ section }) => (
                        <SectionHeader>
                            {section.title}
                        </SectionHeader>
                    )}
                    contentContainerStyle={modules.length === 0 && { flex: 1, justifyContent: "center" }}
                    ListEmptyComponent={() => (
                        <ListEmptyText>
                            Não há histórico de irrigações.
                        </ListEmptyText>
                    )}
                />


            </Container>
        </ImageContainer>
    )
}