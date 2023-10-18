const startComment = '<!--START_SECTION:npm-packages-->'
const endComment = '<!--END_SECTION:npm-packages-->'

const statsBlockReg = new RegExp(`${startComment}[\\s\\S]+?${endComment}`)

export function isRenderNpmPackages(readme: string): boolean {
  return statsBlockReg.test(readme)
}

export function updateTopNpmPackagesText(
  readme: string,
  formattedText: string
): string {
  return readme.replace(
    statsBlockReg,
    `${startComment}\n\n\`\`\`text\n${formattedText}\n\`\`\`\n\n${endComment}`
  )
}
