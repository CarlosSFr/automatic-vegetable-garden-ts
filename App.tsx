import { ThemeProvider } from 'styled-components';
import theme from "./src/theme"
import { Home } from './src/screens/Home';
import { RobotoCondensed_400Regular, RobotoCondensed_700Bold, useFonts } from "@expo-google-fonts/roboto-condensed"
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ RobotoCondensed_400Regular, RobotoCondensed_700Bold });

  return (
    <ThemeProvider theme={theme} >
      {fontsLoaded ? <Home /> : <Loading />}
    </ThemeProvider>
  );
}

