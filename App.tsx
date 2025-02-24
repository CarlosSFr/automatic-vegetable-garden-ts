import { ThemeProvider } from 'styled-components';
import theme from "./src/theme"
import { RobotoCondensed_400Regular, RobotoCondensed_700Bold, useFonts } from "@expo-google-fonts/roboto-condensed"
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { ModuleProvider } from './src/contexts/CyclesContext';
import Toast from 'react-native-toast-message';

export default function App() {
  const [fontsLoaded] = useFonts({ RobotoCondensed_400Regular, RobotoCondensed_700Bold });

  return (
    <ThemeProvider theme={theme} >
      <ModuleProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </ModuleProvider>
      <Toast />
    </ThemeProvider>
  );
}

