import { sortBy, mapValues, reverse } from 'lodash-es'

import { getTopLanguages, ITopLanguagesData } from '../data/top-languages'

function format(topLangs: ITopLanguagesData): string {
  const result = [`Most Used Languages`]

  const orderedTopLangs = reverse(
    sortBy(mapValues(topLangs), item => item.size)
  )

  const totalLanguageSize = orderedTopLangs.reduce(
    (prev, current) => prev + current.size,
    0
  )

  for (const item of orderedTopLangs.slice(0, 5)) {
    result.push(
      `${item.name} ${((item.size * 100) / totalLanguageSize).toFixed(2)}%`
    )
  }

  return result.join('\n')
}

export async function getTopLanguagesText(login: string): Promise<string> {
  const topLangs = await getTopLanguages(login)
  return format(topLangs)
}
