import * as core from '@actions/core'

import { getReadme } from './data/readme'
import { getRepoName, getRepoOwner } from './utils/inputs'
import { commitUpdateReadme } from './services/readme'
import { getUserStatsText } from './views/user-stats'
import { getTopLanguagesText } from './views/top-languages'
import { isRenderUserStat, updateUserStatsText } from './utils/user-stats'
import { isRenderTopLangs, updateTopLangsText } from './utils/top-languages'
import {
  isRenderNpmPackages,
  updateTopNpmPackagesText
} from './utils/npm-packages'
import { getTopNpmPackagesText } from './views/npm-packages'

interface ITask {
  name: string
  run: () => Promise<string>
  callback: (readme: string, userStats: string) => string
}

async function run(): Promise<void> {
  try {
    const repoOwner = getRepoOwner()
    const repoName = getRepoName()
    core.info(`INFO: Repo owner: ${repoOwner}`)
    core.info(`INFO: Repo name: ${repoName}`)

    const readme = await getReadme({
      owner: repoOwner,
      repo: repoName
    })

    core.info(`INFO: Get readme content success`)

    const tasks: ITask[] = []

    if (isRenderUserStat(readme)) {
      tasks.push({
        name: 'user stats',
        run: async () => getUserStatsText(repoOwner),
        callback: (readmeContent, formattedText) =>
          updateUserStatsText(readmeContent, formattedText)
      })
    }

    if (isRenderTopLangs(readme)) {
      tasks.push({
        name: 'top langs',
        run: async () => getTopLanguagesText(repoOwner),
        callback: (readmeContent, formattedText) =>
          updateTopLangsText(readmeContent, formattedText)
      })
    }

    if (isRenderNpmPackages(readme)) {
      tasks.push({
        name: 'npm packages',
        run: async () =>
          getTopNpmPackagesText(
            core.getInput('npm-packages-author', {
              required: true
            }),
            {
              exclude: core.getInput('npm-packages-exclude'),
              maxShowPackages:
                Number(core.getInput('npm-packages-max-show-packages')) || 10,
              versionBadgeColor: core.getInput(
                'npm-packages-version-badge-color'
              ),
              downloadsBadgeColor: core.getInput(
                'npm-packages-download-badge-color'
              )
            }
          ),
        callback: (readmeContent, formattedText) =>
          updateTopNpmPackagesText(readmeContent, formattedText)
      })
    }

    if (tasks.length === 0) {
      core.info('INFO: Readme without special comments,')
      core.info('INFO: So, stats-readme was not updated')
      return
    }

    const viewTexts = await Promise.all(tasks.map(async item => item.run()))

    const newReadme = viewTexts.reduce((prev, viewText, currentIndex) => {
      return tasks[currentIndex].callback(prev, viewText)
    }, readme)

    if (newReadme === readme) {
      core.info('INFO: Stats views without changes,')
      core.info('INFO: So, stats-readme was not updated')
      return
    }

    await commitUpdateReadme({
      owner: repoOwner,
      repo: repoName,
      message: `Updated stats-readme graph with ${tasks
        .map(item => item.name)
        .join(', ')}`,
      content: newReadme
    })

    core.info(`INFO: Stats updated successfully`)
    core.info(`\n\nThanks for using stats-readme!`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
