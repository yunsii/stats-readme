import { max, padEnd } from 'lodash-es'
import cfonts from 'cfonts'

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
      label: `Total Commits (${new Date().getFullYear()})`,
      value: stats.totalCommits
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
      label: 'Contributed to',
      value: stats.contributedTo
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
    totalCommits: stats.totalCommits,
    contributions: stats.contributedTo,
    followers: stats.followers,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
    stargazers: stats.totalStars
  })

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

  // result.array.length = 3
  const rankFontLines = ['', ...result.array, '']

  return infoLines
    .map((item, index) => {
      return `${padEnd(item, maxInfoLineLength + 20, ' ')}${
        rankFontLines[index]
      }`
    })
    .join('\n')
}

export async function getUserStatsText(login: string): Promise<string> {
  const stats = await getUserStats(login)
  return format(stats)
}
