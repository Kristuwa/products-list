import { DefaultTheme, createGlobalStyle } from "styled-components";
import "modern-normalize";

interface Theme extends DefaultTheme {
  color: {
    primaryColor: string;
    bg: string;
  };
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    color: ${(p: { theme: Theme }) => p.theme.color.primaryColor};
    background-color: ${(p: { theme: Theme }) => p.theme.color.bg};
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
  }
  ul,ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none
  }
`;
