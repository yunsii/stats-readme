import { it } from '@jest/globals'

import { calculateRank } from '../src/utils/user-stats'
import { expect } from '@jest/globals'

it('should calculate rank correctly', () => {
  const stats = {
    name: 'Yuns',
    totalRepos: 153,
    totalReviews: 2,
    totalPRs: 84,
    totalCommits: 4191,
    totalCommitsInLastYear: 683,
    totalIssues: 201,
    totalStars: 857,
    followers: 144,
    contributedToInLastYear: 26
  }

  const rank = calculateRank({
    totalRepos: stats.totalRepos,
    commits: stats.totalCommits,
    isAllCommits: true,
    followers: stats.followers,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
    reviews: stats.totalReviews,
    stars: stats.totalStars
  })
  expect(rank.level).toBeDefined()
})
