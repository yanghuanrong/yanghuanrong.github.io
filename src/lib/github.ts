import type { Contribution } from '../consts'

export type RepoStats = {
  stars: number
  forks: number
}

export type ContributionWithStats = Contribution & {
  stars: number | null
  forks: number | null
}

export function formatCount(n: number): string {
  if (n >= 10000) {
    const value = n / 10000
    const text = value >= 10 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, '')
    return `${text}万`
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return String(n)
}

async function fetchRepoStats(repo: string): Promise<RepoStats | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'yanghuanrong.github.io',
      },
    })
    if (!response.ok) return null
    const data = (await response.json()) as {
      stargazers_count?: number
      forks_count?: number
    }
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
    }
  } catch {
    return null
  }
}

export async function withContributionStats(
  items: readonly Contribution[],
): Promise<ContributionWithStats[]> {
  return Promise.all(
    items.map(async (item) => {
      const stats = await fetchRepoStats(item.repo)
      return {
        ...item,
        stars: stats?.stars ?? null,
        forks: stats?.forks ?? null,
      }
    }),
  )
}
