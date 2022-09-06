import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    margin: 0;
  }
`;

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;