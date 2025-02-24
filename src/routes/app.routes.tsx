import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { PlantData } from "../screens/PlantData";
import { HomeTest } from "../screens/HomeTest"
import { History } from "../screens/History";
import { Modules } from "../screens/Modules";
import { Platform } from "react-native";

import { useTheme } from "styled-components/native";

import HomeSvg from "./../assets/Home.svg"
import HistorySvg from "./../assets/History.svg"
import Config from "./../assets/Config.svg"

type AppRoutes = {
    home: undefined;
    profile: undefined;
    plantData: undefined;
    history: undefined;
    control: undefined;
    modules: undefined;
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { colors, font_size } = useTheme()

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green_500,
                tabBarInactiveTintColor: colors.gray_100,
                tabBarStyle: {
                    backgroundColor: colors.gray_700,
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: 36,
                    paddingTop: 36,
                }
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg
                            fill={color}
                            width={32}
                            height={32}
                        />
                    )
                }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarButton: () => null,
                }}
            />

            <Screen
                name="modules"
                component={Modules}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Config
                            fill={color}
                            width={32}
                            height={32}
                        />
                    )
                }}
            />

            <Screen
                name="plantData"
                component={PlantData}
                options={{
                    tabBarButton: () => null,
                }}
            />

            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg
                            fill={color}
                            width={32}
                            height={32}
                        />
                    )
                }}
            />
        </Navigator>
    )
}