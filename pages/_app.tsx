import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from '@/styles/global.style'
import { theme } from '@/styles/theme.style'

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()

	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	)
}

export default MyApp
