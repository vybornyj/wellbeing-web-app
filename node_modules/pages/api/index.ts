import { NextApiHandler } from 'next'
import { withSession } from 'src/scripts-server/sessions/withSession'

const Api: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  res.status(200).end('OK')
}

export default withSession(Api)
