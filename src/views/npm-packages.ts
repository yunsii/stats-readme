import { getNpmPackages } from '../services/npm'
import { NpmPackagesResult } from '../services/npm/types'

const DEFAULT_BADGE_COLOR = 'a1b858'

export interface FormatOptions {
  /** default: a1b858 */
  versionBadgeColor?: string
  /** default: a1b858 */
  downloadsBadgeColor?: string
}

function format(
  objects: NpmPackagesResult['objects'],
  options: FormatOptions = {}
): string {
  const { versionBadgeColor, downloadsBadgeColor } = options

  const mergedVersionBadgeColor = versionBadgeColor || DEFAULT_BADGE_COLOR
  const mergedDownloadsBadgeColor = downloadsBadgeColor || DEFAULT_BADGE_COLOR

  let result = `
| Name | Description | Version | Downloads |
| ---- | ----------- | ------- | --------- |
`

  for (const object of objects) {
    const packageName = object.package.name

    const cells = [
      packageName,
      object.package.description || '-',
      `[![NPM version](https://img.shields.io/npm/v/${packageName}?color=${mergedVersionBadgeColor})](https://www.npmjs.com/package/${packageName})`,
      `[![Download monthly](https://img.shields.io/npm/dm/${packageName}.svg?color=${mergedDownloadsBadgeColor})](https://www.npmjs.com/package/${packageName})`
    ]

    result += `| ${cells.join(' | ')} |\n`
  }

  return result
}

export interface GetTopNpmPackagesTextOptions extends FormatOptions {
  /** new RegExp exclude to test */
  exclude?: string
  /** default 10 */
  maxShowPackages?: number
}

export async function getTopNpmPackagesText(
  author: string,
  options: GetTopNpmPackagesTextOptions = {}
): Promise<string> {
  const { exclude, maxShowPackages } = options

  const packagesResult = await getNpmPackages(author)
  return format(
    packagesResult.objects
      .filter(object => {
        if (exclude) {
          const reg = new RegExp(exclude)
          return !reg.test(object.package.name)
        }
        return true
      })
      .slice(0, maxShowPackages || 10)
  )
}
