import { sortBy, mapValues, reverse, max, padEnd, repeat } from 'lodash-es'

import { getTopLanguages, ITopLanguagesData } from '../data/top-languages'

const progressBarLength = 25
const progressBarWalkedSign = '>'
const progressBarEmptySign = '-'

function format(topLangs: ITopLanguagesData): string {
  const orderedTopLangs = reverse(
    sortBy(mapValues(topLangs), item => item.size)
  )

  const totalLanguageSize = orderedTopLangs.reduce(
    (prev, current) => prev + current.size,
    0
  )

  const info: { label: string; value: number }[] = []

  for (const item of orderedTopLangs.slice(0, 5)) {
    info.push({
      label: item.name,
      value: (item.size * 100) / totalLanguageSize
    })
  }

  const maxLabelLength = max(info.map(item => item.label.length)) || 0

  const infoLines = info.map(item => {
    return `${padEnd(item.label, maxLabelLength + 3, ' ')}${item.value.toFixed(
      2
    )}%`
  })

  const maxInfoLineLength = max(infoLines.map(item => item.length)) || 0

  return infoLines
    .map((item, index) => {
      const walkedCount = Math.round(
        (info[index].value * progressBarLength) / 100
      )

      return `${padEnd(item, maxInfoLineLength + 3, ' ')}${repeat(
        progressBarWalkedSign,
        walkedCount
      )}${repeat(progressBarEmptySign, progressBarLength - walkedCount)}`
    })
    .join('\n')
}

export async function getTopLanguagesText(login: string): Promise<string> {
  const topLangs = await getTopLanguages(login)
  return format(topLangs)
}
