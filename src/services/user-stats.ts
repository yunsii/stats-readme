import octokit from '../requests/octokit'

export interface IUserStatsResponse {
  user: {
    name: string
    login: string
    contributionsCollection: {
      totalCommitContributions: number
      restrictedContributionsCount: number
    }
    repositoriesContributedTo: {
      totalCount: number
    }
    pullRequests: {
      totalCount: number
    }
    openIssues: {
      totalCount: number
    }
    closedIssues: {
      totalCount: number
    }
    followers: {
      totalCount: number
    }
    repositories: {
      totalCount: number
      nodes: {
        stargazers: {
          totalCount: number
        }
      }[]
    }
  }
}

export interface IUserStatsVariables {
  login: string
}

// No need to consider error request, octokit processed very well
export async function fetchUserStats(
  variables: IUserStatsVariables
): Promise<IUserStatsResponse> {
  // Online test: https://docs.github.com/en/graphql/overview/explorer
  // Ref: https://github.com/anuraghazra/github-readme-stats/blob/a481021dab695e1d8259e218d8e159e8a2110b1e/src/fetchers/stats-fetcher.js#L20
  return await octokit.graphql({
    query: `
      query userInfo($login: String!) {
        user(login: $login) {
          name
          login
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          openIssues: issues(states: OPEN) {
            totalCount
          }
          closedIssues: issues(states: CLOSED) {
            totalCount
          }
          followers {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `,
    ...variables
  })
}
