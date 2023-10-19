import octokit from '../requests/octokit'
import * as core from '@actions/core'

export type TReadmeResponse = ReturnType<
  Awaited<typeof octokit.rest.repos.getReadme>
>

export interface IReadmeParams {
  owner: string
  repo: string
}

export async function fetchReadme(
  params: IReadmeParams
): Promise<TReadmeResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await octokit.rest.repos.getReadme(params as any)

  return result
}

export interface IUpdateReadmePayload {
  owner: string
  repo: string
  content: string
  message: string
}

export async function commitUpdateReadme(
  payload: IUpdateReadmePayload
): Promise<void> {
  const result = await fetchReadme(payload)

  core.info(`readme path: ${result.data.path}`)
  // ref: https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/a1dcf83105720d9bad191854d5aa285260117436/src/generated/endpoints.ts#L1284
  await octokit.rest.repos.createOrUpdateFileContents({
    ...payload,
    sha: result.data.sha,
    content: Buffer.from(payload.content, 'utf-8').toString(
      // eslint-disable-next-line no-undef
      result.data.encoding as BufferEncoding
    ),
    path: result.data.path
  })
}
