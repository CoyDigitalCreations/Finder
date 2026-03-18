import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HistoryState {
    history: string[]
    addToHistory: (username: string) => void
    clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set) => ({
            history: [],
            addToHistory: (username) =>
                set((state) => ({
                    history: state.history.includes(username)
                        ? state.history
                        : [username, ...state.history].slice(0, 10),
                })),
            clearHistory: () => set({ history: [] }),
        }),
        {
            name: 'github-history',
        }
    )
)