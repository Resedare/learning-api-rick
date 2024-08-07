import "./App.css";
import AppRouter from "./AppRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
