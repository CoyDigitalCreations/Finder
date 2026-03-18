import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Repository } from '../types/repository'

interface GitHubRepoResponse {
    id: number
    name: string
    html_url: string
    description: string | null
    language: string | null
    stargazers_count: number
}

const fetchRepos = async (username: string): Promise<Repository[]> => {
    const { data } = await axios.get<GitHubRepoResponse[]>(
        `https://api.github.com/users/${username}/repos`,
        {
            params: {
                sort: 'updated',
                per_page: 100,
            },
        }
    )

    return data.map((repo): Repository => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        starnumbers: repo.stargazers_count,
    }))
}

export const useSearchRepos = (username: string) => {
    return useQuery({
        queryKey: ['repos', username],
        queryFn: () => fetchRepos(username),
        enabled: !!username,
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}