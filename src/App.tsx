import React, { FC } from "react";
import "./App.css";
import { theme } from "./utils/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <h1>Список товаров</h1>
      </main>
    </ThemeProvider>
  );
};

export default App;
