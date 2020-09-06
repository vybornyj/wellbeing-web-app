import { NextApiHandler } from 'next'
import translate from 'node-google-translate-skidz'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  lang: lang
  content: string
}

interface ResponseBody {
  content?: string
  translated?: string
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { content, lang }: RequestBody = req.body
  const text = content
  const source = lang === 'ru' ? 'en' : 'ru'
  const target = lang

  const translated = await translate({ text, source, target }, (r) => r)

  if (translated?.translation) {
    await res.status(200).json({ content: translated.translation })
  } else {
    await res.status(200).json({ translated })
  }
}

export default withSession(Api)
