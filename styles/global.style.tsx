import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #EEE;
    color: #444;
    font-family: 'Eczar', serif;
  }
  
  body {
    height: 100vh;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
