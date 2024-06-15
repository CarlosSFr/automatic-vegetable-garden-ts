import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseESP";


export function Routes() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("user", user);
            setUser(user);
        });
    }, [])

    return (
        <NavigationContainer>
            {user ?
                <AppRoutes />
                :
                <AuthRoutes />
            }
        </NavigationContainer>
    )
}