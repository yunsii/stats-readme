import { fetchUserStats } from '../services/user-stats'

export interface IStatsData {
  name: string
  totalRepos: number
  totalPRs: number
  totalCommits: number
  totalIssues: number
  totalStars: number
  followers: number
  contributedTo: number
}

export async function getUserStats(
  login: string,
  options?: {
    includePrivate?: boolean
  }
): Promise<IStatsData> {
  const includePrivate = options?.includePrivate || false

  // Ref: https://github.com/anuraghazra/github-readme-stats/blob/a481021dab/src/fetchers/stats-fetcher.js
  const stats = {
    name: '',
    totalRepos: 0,
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    followers: 0,
    contributedTo: 0
  }

  const response = await fetchUserStats({ login })

  const { user } = response

  stats.name = user.name || user.login
  stats.totalRepos = user.repositories.totalCount
  stats.totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount

  // normal commits
  stats.totalCommits = user.contributionsCollection.totalCommitContributions

  // if includePrivate then add private commits to totalCommits so far.
  if (includePrivate) {
    stats.totalCommits +=
      user.contributionsCollection.restrictedContributionsCount
  }

  stats.totalPRs = user.pullRequests.totalCount
  stats.contributedTo = user.repositoriesContributedTo.totalCount

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount
  }, 0)
  stats.followers = user.followers.totalCount

  return stats
}
