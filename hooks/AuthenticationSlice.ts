import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IAuthenticationSlice {
	tokens: {
		access: string
		refresh: string
		save: (access: string, refresh: string) => void
	}
}

export const useAuthenticationSlice = create<IAuthenticationSlice>()(
	immer((set) => ({
		tokens: {
			access: '',
			refresh: '',
			save: (access, refresh) =>
				set((state) => {
					state.tokens.access = access
					state.tokens.refresh = refresh
				}),
		},
	}))
)

export default useAuthenticationSlice
