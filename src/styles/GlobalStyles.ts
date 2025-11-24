import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    font:inherit;
    color:inherit;
    font-family: SpoqaHanSansNeo;
  }
  *, :after, :before {
    box-sizing:border-box;
  }
  :root {
    -webkit-tap-highlight-color:transparent;
    -webkit-text-size-adjust:100%;
    text-size-adjust:100%;
    cursor:default;
    line-height:1.2;
    overflow-wrap:break-word;
    word-break:break-word;
    tab-size:4;
    width: 100%;
    height: 100%;
  }
  html {
    height:100%;
    font-size: 62.5%;
  }
  body {
    height: 100%;
  }
  #root {
    width: 100%;
    height: 100%;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width:100%;
  }
  button {
    padding: 0;
    background:none;
    border:0;
    cursor:pointer;
    outline: none;
  }
  button:focus {
    outline: none;
  }
  a {
    text-decoration:none;
  }
  p, span, h1, h2, h3, h4, h5, h6, li {
    cursor: text;
  }
  table {
    border-collapse:collapse;
    border-spacing:0
  }
  input {
    outline: none;
  }
`;

export default GlobalStyles;
