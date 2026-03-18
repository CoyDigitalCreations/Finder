import React from 'react'
import { Repository } from '../types/repository'

interface Props {
    repo: Repository
}

export const RepoCard: React.FC<Props> = ({ repo }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 lg:p-5 hover:shadow-lg transition-all bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg lg:text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline break-all"
                >
                    {repo.name}
                </a>
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full self-start">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-700">{repo.starnumbers}</span>
                </div>
            </div>

            {repo.description && (
                <p className="text-gray-600 text-sm lg:text-base mb-4 line-clamp-2 bg-gray-50 p-3 rounded-lg">
                    {repo.description}
                </p>
            )}

            {repo.language && (
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm font-medium text-gray-600">{repo.language}</span>
                </div>
            )}
        </div>
    )
}