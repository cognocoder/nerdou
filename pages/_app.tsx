import type { AppProps } from 'next/app'

import { createGlobalStyle, ThemeProvider } from 'styled-components'

import GlobalStyle from '@/styles/global.style'
import { theme } from '@/styles/theme.style'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp
