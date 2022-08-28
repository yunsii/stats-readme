import { getOctokit } from '@actions/github'
import * as core from '@actions/core'

const githubToken = core.getInput('GITHUB_TOKEN')

export default getOctokit(githubToken)
