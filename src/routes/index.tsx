import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged, updateCurrentUser, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { Loading } from "../components/Loading";
import { useUser } from "../hooks/useUser";

export function Routes() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const UserData = useUser();

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(user && user.displayName === null){
                FIREBASE_AUTH.signOut();
            }
            // console.log(user)
            setUser(user);
            setLoading(false);
        });
    }, [])
    if(loading || user?.displayName === null){
        return (
            <Loading />
        )
    }
    return (
        <NavigationContainer>
            {user?
                <AppRoutes />
                :
                <AuthRoutes />
            }
        </NavigationContainer>
    )
}