import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @media(max-width: 1080px) {
    html {
      font-size: 97.75%;
    }
  }
  @media(max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
  body{
      width: 100%;
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.white.light};
  }
  *,
  *:after,
  *:before {
      box-sizing: inherit;
  }
  *, button, input{
      border: 0;
      outline: 0;
  }
  h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
  }
  p {
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding: 0;
      margin: 0;
  }
  body, input, button, textarea{
    font: 400 1rem 'Roboto', sans-serif;
    box-sizing: border-box;
  }
  button {
      font: 400 1rem 'Lexend', sans-serif;
  }
  button, a,
  [type = "submit"] {
      cursor: pointer;
      -webkit-appearance: button;
      -moz-appearance: button;
  }
`;