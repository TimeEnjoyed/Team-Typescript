import { DevList } from "./components/DevList";
import { TwitchList } from "./components/TwitchList";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const mode = location.pathname === "/" ? "dev" : "prod";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline enableColorScheme />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {mode === "dev" ? <DevList /> : <TwitchList setTheme={setTheme} />}
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
