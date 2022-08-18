import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IAuthenticationSlice {
	tokens: {
		access: string
		refresh: string
		load: () => boolean
		save: (access: string, refresh: string) => void
	}
}

export const useAuthenticationSlice = create<IAuthenticationSlice>()(
	immer((set) => ({
		tokens: {
			access: '',
			refresh: '',
			load: () => {
				const access = localStorage.getItem('access') || ''
				const refresh = localStorage.getItem('refresh') || ''

				set((state) => {
					state.tokens.access = access
					state.tokens.refresh = refresh
				})

				if (access.length && refresh.length) {
					return true
				}
				return false
			},
			save: (access, refresh) => {
				localStorage.setItem('access', access)
				localStorage.setItem('refresh', refresh)
				set((state) => {
					state.tokens.access = access
					state.tokens.refresh = refresh
				})
			},
		},
	}))
)

export default useAuthenticationSlice
