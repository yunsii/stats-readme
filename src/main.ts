import * as core from '@actions/core'

import { getReadme } from './data/readme'
import { updateUserStatsText } from './utils/user-stats'
import { getUserStatsText } from './views/user-stats'
import { commitUpdateReadme } from './services/readme'
import { getRepoName, getRepoOwner } from './utils/inputs'
// import { getTopLanguagesText } from './views/top-languages'

async function run(): Promise<void> {
  try {
    const repoOwner = getRepoOwner()
    const repoName = getRepoName()
    core.info(`INFO: repoOwner: ${repoOwner}`)
    core.info(`INFO: repoName: ${repoName}`)
    const stats = await getUserStatsText(repoOwner)
    const readme = await getReadme({
      owner: repoOwner,
      repo: repoName
    })
    const content = updateUserStatsText(readme, stats)
    await commitUpdateReadme({
      owner: repoOwner,
      repo: repoName,
      message: 'Updated stats-readme graph with user stats',
      content
    })
    core.info(`INFO: Stats updated successfully`)
    core.info(`\n\nThanks for using StatsReadme!`)
    // const topLanguages = await getTopLanguagesText(login)
    // core.info(stats)
    // core.info(topLanguages)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
