import React from 'react'
import { useHistoryStore } from '../store/historyStore'

interface Props {
    onSelect: (username: string) => void
}

export const HistoryList: React.FC<Props> = ({ onSelect }) => {
    const { history, clearHistory } = useHistoryStore()

    if (history.length === 0) return null

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Historial
                </h3>
                <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
                >
                    Limpiar todo
                </button>
            </div>
            <div className="space-y-2">
                {history.map((user) => (
                    <button
                        key={user}
                        onClick={() => onSelect(user)}
                        className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 
                       rounded-lg text-sm text-gray-700 hover:text-blue-700 
                       transition-colors border border-gray-100 hover:border-blue-200"
                    >
                        <span className="font-medium">@{user}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}