import { createWriteStream } from 'fs'
import { NextApiHandler } from 'next'
import getConfig from 'next/config'
import { withSession } from 'src/scripts-server/sessions/withSession'

const { publicRuntimeConfig, serverRuntimeConfig }: GetConfig = getConfig()

const contentTypeToExtension = {
  'image/bmp': '.bmp',
  'image/cis-cod': '.cod',
  'image/gif': '.gif',
  'image/ief': '.ief',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/svg': '.svg',
  'image/svg+xml': '.svg',
  'image/tiff': '.tif',
  'image/x-cmu-raster': '.ras',
  'image/x-cmx': '.cmx',
  'image/x-icon': '.ico',
  'image/x-portable-anymap': '.pnm',
  'image/x-portable-bitmap': '.pbm',
  'image/x-portable-graymap': '.pgm',
  'image/x-portable-pixmap': '.ppm',
  'image/x-rgb': '.rgb',
  'image/x-xbitmap': '.xbm',
  'image/x-xpixmap': '.xpm',
  'image/x-xwindowdump': '.xwd',
  'image/vnd.microsoft.icon': '.ico',
  'image/vnd.wap.wbmp': '.wbmp',
  'image/webp': '.webp',
}

const Api: NextApiHandler = async (req, res) => {
  const contentType = req.headers['content-type']

  if (!contentType?.includes('image/')) {
    res.status(400).end(`Content-type ${contentType} Not Allowed`)
  } else {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const imageName = `${timestamp}${contentTypeToExtension[contentType] ?? '.jpg'}`

    const imagePath = `${serverRuntimeConfig.PATH_STATIC}/images/${imageName}`
    const imageUrl = `${publicRuntimeConfig.URL_STATIC}/images/${imageName}`

    req.pipe(createWriteStream(imagePath))

    await res.status(200).json({ imageUrl })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withSession(Api)
