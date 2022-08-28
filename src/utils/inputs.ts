import * as core from '@actions/core'

export function getRepoOwner(): string {
  return core.getInput('GITHUB_REPOSITORY_OWNER')
}

export function getRepo(): string {
  return core.getInput('GITHUB_REPOSITORY')
}

export function getRepoName(): string {
  const repo = getRepo()

  return repo.split('/')[1]
}
