import octokit from '../requests/octokit'

export interface ITopLanguagesResponse {
  user: {
    repositories: {
      nodes: {
        name: string
        languages: {
          edges: {
            size: number
            node: {
              /** like: #3572A5 */
              color: string
              name: string
            }
          }[]
        }
      }[]
    }
  }
}

export interface ITopLanguagesVariables {
  login: string
}

export async function fetchRepoLanguages(
  variables: ITopLanguagesVariables
): Promise<ITopLanguagesResponse> {
  return await octokit.graphql({
    query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    ...variables
  })
}
