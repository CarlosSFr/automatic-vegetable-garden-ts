import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeAuth, updateProfile, } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth"
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref as sRef } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDXcJgq_AMT5vlylZS2_rliSZ1r9xT18xw",
    authDomain: "automatic-garden-824cc.firebaseapp.com",
    databaseURL: "https://automatic-garden-824cc-default-rtdb.firebaseio.com",
    projectId: "automatic-garden-824cc",
    storageBucket: "automatic-garden-824cc.appspot.com",
    messagingSenderId: "290415846546",
    appId: "1:290415846546:web:58e21b91641b094090724b"
};

//Initialize firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const storage = getStorage();
const db = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export { db, ref, onValue };

export async function uploadProfilePic(uri, currentUser) {
    const fileRef = sRef(storage, currentUser.uid + ".jpg");

    const fetchResponse = await fetch(uri);

    const fileBlob = await fetchResponse.blob()

    const snapshot = await uploadBytes(fileRef, fileBlob);

    const url = await getDownloadURL(fileRef)

    await updateProfile(currentUser, { photoURL: url })
}

export async function uploadImageToPlantData(uri, imageName) {
    try {
        // Define o caminho do arquivo na pasta PlantData
        const fileRef = sRef(storage, `PlantData/${imageName}`);

        // Faz o fetch da URI para obter o blob
        const fetchResponse = await fetch(uri);
        const fileBlob = await fetchResponse.blob();

        // Faz o upload do blob para o Firebase Storage
        await uploadBytes(fileRef, fileBlob);

        // Obtém a URL de download do arquivo recém-enviado
        const url = await getDownloadURL(fileRef);

        console.log("Imagem salva com sucesso:", url);
        return url;
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        throw error;
    }
}
