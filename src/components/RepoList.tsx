import React from 'react'
import { Repository } from '../types/repository'
import { RepoCard } from './RepoCard'

interface Props {
    repos: Repository[]
    isEmpty?: boolean
}

export const RepoList: React.FC<Props> = ({ repos, isEmpty }) => {
    if (isEmpty) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                    Este usuario no tiene repositorios públicos
                </p>
            </div>
        )
    }

    if (repos.length === 0) return null

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
}