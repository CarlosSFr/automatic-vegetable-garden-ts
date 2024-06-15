import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { Loading } from "../components/Loading";


export function Routes() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("user", user);
            setUser(user);
            setLoading(false);
        });
    }, [])

    if(loading){
        return (
            <Loading />
        )
    }

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