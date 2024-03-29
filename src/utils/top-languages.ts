const startComment = '<!--START_SECTION:stats:langs-->'
const endComment = '<!--END_SECTION:stats:langs-->'

const statsBlockReg = new RegExp(`${startComment}[\\s\\S]+?${endComment}`)

export function isRenderTopLangs(readme: string): boolean {
  return statsBlockReg.test(readme)
}

export function updateTopLangsText(
  readme: string,
  formattedText: string
): string {
  return readme.replace(
    statsBlockReg,
    `${startComment}\n\n\`\`\`text\n${formattedText}\n\`\`\`\n\n${endComment}`
  )
}
