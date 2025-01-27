import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

const STORAGE_PATH = "History/history.json";

// Obter histórico do Firebase Storage
export async function getHistoryFromStorage() {
    const storage = getStorage();
    const fileRef = storageRef(storage, STORAGE_PATH);

    try {
        const url = await getDownloadURL(fileRef);
        const response = await fetch(url);
        const data = await response.json();
        return data.history.userName || [];
    } catch (error) {
        if (error.code === "storage/object-not-found") {
            console.warn("Arquivo de histórico não encontrado. Retornando vazio.");
            return [];
        }
        throw error;
    }
}

// Salvar histórico no Firebase Storage
export async function saveHistoryToStorage(newEntry) {
    const storage = getStorage();
    const fileRef = storageRef(storage, STORAGE_PATH);

    try {
        const existingHistory = await getHistoryFromStorage();
        const updatedHistory = [...existingHistory, newEntry];

        // Reiniciar o histórico se atingir 30 registros
        if (updatedHistory.length > 30) {
            await deleteObject(fileRef);
            updatedHistory.splice(0, updatedHistory.length - 1); // Manter apenas o último registro
        }

        const updatedData = { history: { userName: updatedHistory } };
        const blob = new Blob([JSON.stringify(updatedData)], { type: "application/json" });
        await uploadBytes(fileRef, blob);

        console.log("Histórico atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar histórico:", error);
    }
}
