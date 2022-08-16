import useAuthenticationSlice from './AuthenticationSlice'

function useAuthenticated() {
	const access = useAuthenticationSlice((state) => state.tokens.access)
	const refresh = useAuthenticationSlice((state) => state.tokens.refresh)

	if (access.length && refresh.length) {
		return true
	}

	return false
}

export default useAuthenticated
