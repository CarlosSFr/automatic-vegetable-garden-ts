import { ThemeProvider } from 'styled-components';
import { Login } from './src/screens/Login';
import theme from "./src/theme"

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <Login />
    </ThemeProvider>
  );
}

