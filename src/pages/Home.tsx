import React, { useState } from 'react'
import axios from 'axios'
import { SearchBar } from '../components/SearchBar'
import { RepoList } from '../components/RepoList'
import { HistoryList } from '../components/HistoryList'
import { Loader } from '../components/Loader'
import { useSearchRepos } from '../hooks/useSearchRepos'
import { useHistoryStore } from '../store/historyStore'

export const Home: React.FC = () => {
  const [username, setUsername] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data, isLoading, error, refetch } = useSearchRepos(username)
  const addToHistory = useHistoryStore((state) => state.addToHistory)

  const handleSearch = async (user: string) => {
    setUsername(user)
    const result = await refetch()
    if (result.data && result.data.length > 0) {
      addToHistory(user)
    }
    setIsMobileMenuOpen(false)
  }

  const isUserNotFound = axios.isAxiosError(error) && error.response?.status === 404
  const isOtherError = error && !isUserNotFound
  const hasNoRepos = data && data.length === 0

  return (
    <main className="w-screen h-screen bg-gray-50 overflow-hidden">
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">GitHub Finder</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row h-full">
        <div
          className={`
            ${isMobileMenuOpen ? 'flex' : 'hidden'} 
            lg:flex 
            flex-col 
            w-full lg:w-80 xl:w-96 
            bg-white 
            border-r border-gray-200 
            h-full
            overflow-y-auto
            absolute lg:relative
            z-10
            inset-0
          `}
        >
          <div className="p-4 lg:p-6 space-y-6 flex-1">
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
                GitHub Finder
              </h1>
              <p className="text-gray-500 text-sm">
                Busca repositorios públicos
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl sticky top-0">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
            <HistoryList onSelect={handleSearch} />
            <div className="mt-auto pt-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  * Tips
                </h3>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>- Haz clic en el historial para buscar de nuevo</li>
                  <li>- Los repositorios se ordenan por actualización</li>
                  <li>- Máximo 100 repositorios por búsqueda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 overflow-y-auto h-full">
          <div className="p-4 lg:p-8 min-h-full">
            {!username && !isLoading && !error && (
              <div className="h-full flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
                  <div className="text-7xl mb-6">🔍</div>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                    Busca un usuario
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Ingresa un nombre de usuario en la barra de búsqueda
                  </p>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <Loader />
              </div>
            )}
            {isUserNotFound && (
              <div className="max-w-2xl mx-auto bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-red-200">
                <div className="flex flex-col items-center text-center">
                  <span className="text-6xl mb-4">😕</span>
                  <h3 className="text-2xl font-semibold text-red-700 mb-3">
                    Usuario no encontrado
                  </h3>
                  <p className="text-gray-600 text-lg">
                    El usuario <span className="font-bold">"{username}"</span> no existe en GitHub
                  </p>
                </div>
              </div>
            )}
            {isOtherError && (
              <div className="max-w-2xl mx-auto bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-red-200">
                <div className="flex flex-col items-center text-center">
                  <span className="text-6xl mb-4">⚠️</span>
                  <h3 className="text-2xl font-semibold text-red-700 mb-3">
                    Error en la búsqueda
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Por favor, intenta de nuevo más tarde
                  </p>
                </div>
              </div>
            )}
            {data && (
              <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      @{username}
                    </h2>
                    <p className="text-gray-500 text-base lg:text-lg">
                      {data.length} {data.length === 1 ? 'repositorio encontrado' : 'repositorios encontrados'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSearch(username)}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors self-start"
                  >
                    Actualizar
                  </button>
                </div>
                <RepoList repos={data} isEmpty={hasNoRepos} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </main>
  )
}