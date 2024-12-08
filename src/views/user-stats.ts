import { max, padEnd } from 'lodash-es'
import cfonts from 'cfonts'
import * as core from '@actions/core'

import { getUserStats, IStatsData } from '../data/user-stats'
import { calculateRank } from '../utils/user-stats'

function format(
  stats: IStatsData,
  options?: {
    noRank?: boolean
  }
): string {
  const noRank = options?.noRank || false

  const info = [
    {
      label: 'Total Stars Earned',
      value: stats.totalStars
    },
    {
      label: `Total Commits`,
      value: stats.totalCommits
    },
    {
      label: `Total Commits (${new Date().getFullYear()})`,
      value: stats.totalCommitsInLastYear
    },
    {
      label: 'Total PRs',
      value: stats.totalPRs
    },
    {
      label: 'Total Issues',
      value: stats.totalIssues
    },
    {
      label: `Contributed to (${new Date().getFullYear()})`,
      value: stats.contributedToInLastYear
    }
  ]

  const maxLabelLength = max(info.map(item => item.label.length)) || 0

  const infoLines = info.map(
    item => `${padEnd(item.label, maxLabelLength + 3, ' ')}${item.value}`
  )

  if (noRank) {
    return infoLines.join('\n')
  }

  const maxInfoLineLength = max(infoLines.map(item => item.length)) || 0

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

  core.info(`Calculated rank: ${JSON.stringify(rank, null, 2)}`)

  const result = cfonts.render(rank.level, {
    font: 'chrome', // define the font face
    align: 'left', // define text alignment
    colors: ['system'], // define all colors
    background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: false, // define if the output text should have empty lines on top and on the bottom
    maxLength: '0', // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: 'node' // define the environment cfonts is being executed in
  })

  const rankStartIndex = Math.ceil((infoLines.length - result.array.length) / 2)

  return infoLines
    .map((item, index) => {
      if (index < rankStartIndex) {
        return item
      }
      if (index >= rankStartIndex + result.array.length) {
        return item
      }

      return `${padEnd(item, maxInfoLineLength + 16, ' ')}${
        result.array[index - rankStartIndex]
      }`
    })
    .join('\n')
}

export async function getUserStatsText(login: string): Promise<string> {
  const stats = await getUserStats(login)
  core.info(`User ${login} stats: ${JSON.stringify(stats, null, 2)}`)
  return format(stats)
}
