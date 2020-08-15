import React from "react";

import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import theme from "./theme";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
