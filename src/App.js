import React from "react";

import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
