import { fetchReadme, IReadmeParams } from '../services/readme'

export async function getReadme(params: IReadmeParams): Promise<string> {
  const result = await fetchReadme(params)

  return Buffer.from(
    result.data.content,
    // eslint-disable-next-line no-undef
    result.data.encoding as BufferEncoding
  ).toString()
}
