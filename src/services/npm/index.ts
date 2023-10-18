import npmFetch from 'npm-registry-fetch'
import { NpmPackagesResult } from './types'

export async function getNpmPackages(
  author: string
): Promise<NpmPackagesResult> {
  // ref: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search
  const res = (await npmFetch.json('/-/v1/search', {
    query: {
      text: `author:${author}`,
      size: 50
    }
  })) as unknown as NpmPackagesResult
  return res
}
