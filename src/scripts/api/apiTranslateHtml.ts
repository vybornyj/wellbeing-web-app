import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

type ApiTranslateHtml = (htmlToTranslate: string, translateTo: lang) => Promise<string | any>

export const apiTranslateHtml: ApiTranslateHtml = async (htmlToTranslate, translateTo) => {
  let html = htmlToTranslate
  let tags = []
  const tagsLength: number = (html.match(/</g) || []).length

  if (tagsLength) {
    for (let num = tagsLength; num > 0; num -= 1) {
      const tag = html.slice(html.indexOf('<'), html.indexOf('>') + 1)
      tags = [...tags, tag]
      html = html.replace(tag, '\r\n')
    }
  }

  const { content } = await apiRequestClient('/api/translate', { content: html, lang: translateTo })
  if (tagsLength && content) {
    let translatedHtml = `\r\n${content}`

    for (let num = 0; num < tagsLength; num += 1) {
      translatedHtml = translatedHtml.includes('\r\n') ? translatedHtml.replace('\r\n', tags[num]) : translatedHtml + tags[num]
    }
    return translatedHtml
  }
  return content
}
