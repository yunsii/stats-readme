import { fetchUserStats, totalCommitsFetcher } from '../services/user-stats'

export interface IStatsData {
  name: string
  totalRepos: number
  totalReviews: number
  totalPRs: number
  totalCommits: number
  totalCommitsInLastYear: number
  totalIssues: number
  totalStars: number
  followers: number
  // ref: https://github.com/anuraghazra/github-readme-stats/issues/2269
  contributedToInLastYear: number
}

export async function getUserStats(login: string): Promise<IStatsData> {
  // Ref: https://github.com/anuraghazra/github-readme-stats/blob/a481021dab/src/fetchers/stats-fetcher.js
  const stats: IStatsData = {
    name: '',
    totalRepos: 0,
    totalReviews: 0,
    totalPRs: 0,
    totalCommits: 0,
    totalCommitsInLastYear: 0,
    totalIssues: 0,
    totalStars: 0,
    followers: 0,
    contributedToInLastYear: 0
  }

  const response = await fetchUserStats({ login })

  const { user } = response

  stats.name = user.name || user.login
  stats.totalRepos = user.repositories.totalCount
  stats.totalReviews =
    user.contributionsCollection.totalPullRequestReviewContributions
  stats.totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount

  // normal commits
  stats.totalCommits = user.contributionsCollection.totalCommitContributions

  stats.totalCommits = await totalCommitsFetcher(login)
  stats.totalCommitsInLastYear =
    user.contributionsCollection.totalCommitContributions

  stats.totalPRs = user.pullRequests.totalCount
  stats.contributedToInLastYear = user.repositoriesContributedTo.totalCount

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount
  }, 0)
  stats.followers = user.followers.totalCount

  return stats
}
