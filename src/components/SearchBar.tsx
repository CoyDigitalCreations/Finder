import React, { useState } from 'react'

interface Props {
    onSearch: (username: string) => void
    isLoading?: boolean
}

export const SearchBar: React.FC<Props> = ({ onSearch, isLoading }) => {
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.trim()) {
            onSearch(input.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                }
                placeholder="Ingresa un usuario de GitHub..."
                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg
                   text-gray-900 placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg
                   hover:bg-blue-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   font-medium shadow-sm hover:shadow-md"
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    )
}