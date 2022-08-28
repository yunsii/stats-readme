import octokit from '../requests/octokit'

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
