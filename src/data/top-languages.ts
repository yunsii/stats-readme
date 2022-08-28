import { fetchRepoLanguages } from '../services/top-languages'

export interface ITopLanguagesData {
  [k: string]: {
    name: string
    color: string
    size: number
  }
}

export async function getTopLanguages(
  login: string,
  options?: {
    excludeRepos?: string[]
  }
): Promise<ITopLanguagesData> {
  const excludeRepos = options?.excludeRepos || []

  const response = await fetchRepoLanguages({ login })

  const { user } = response

  const repoNodes = user.repositories.nodes

  return (
    repoNodes
      .filter(item => !excludeRepos.includes(item.name))
      .filter(item => item.languages.edges.length > 0)
      // flatten the list of language nodes
      .reduce(
        (prev, current) => current.languages.edges.concat(prev),
        [] as {
          size: number
          node: {
            color: string
            name: string
          }
        }[]
      )
      .reduce((prev, current) => {
        // get the size of the language (bytes)
        let langSize = current.size

        // if we already have the language in the accumulator
        // & the current language name is same as previous name
        // add the size to the language size.
        if (
          prev[current.node.name] &&
          current.node.name === prev[current.node.name].name
        ) {
          langSize = current.size + prev[current.node.name].size
        }
        return {
          ...prev,
          [current.node.name]: {
            name: current.node.name,
            color: current.node.color,
            size: langSize
          }
        }
      }, {} as ITopLanguagesData)
  )
}
