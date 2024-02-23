import { FC } from "react";
import "./App.css";
import { theme } from "./utils/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { ProductsPage } from "./components/List/List";
import { Title } from "./components/List/List.styled";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main className="main-container">
        <Title>Список товаров</Title>
		  <ProductsPage />
      </main>
    </ThemeProvider>
  );
};

export default App;
