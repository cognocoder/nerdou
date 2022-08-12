import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #324;
    color: #eee;
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
    font-family: 'Libre Baskerville', serif;
    -webkit-tap-highlight-color: transparent;
  }
`

export default GlobalStyle
