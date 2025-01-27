import { saveHistoryToStorage } from "./storageManager";

async function handleIrrigation(dataIrrig, umidIrrig, module) {
    const newEntry = {
        dataIrrig,
        umidIrrig,
        module,
    };

    try {
        await saveHistoryToStorage(newEntry);
        console.log("Histórico salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar histórico:", error);
    }
}

// Exemplo de uso:
const handleNewIrrigation = async () => {
    const dataIrrig = new Date().toISOString();
    const umidIrrig = "10%"; // Exemplo
    const module = "Espinafre"; // Exemplo

    await handleIrrigation(dataIrrig, umidIrrig, module);
};
